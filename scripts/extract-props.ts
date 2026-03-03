import * as fs from "fs";
import * as path from "path";
import {
  InterfaceDeclaration,
  Node,
  Project,
  Symbol as TsSymbol,
  Type,
  TypeAliasDeclaration,
} from "ts-morph";
import type { ComponentInfo, ExtractedData, PropItem } from "./types";

const COMPONENTS_DIR = "packages/library/src/components";
const OUTPUT_FILE = "generated/props.json";
const DEMOS_DIR = "apps/ui-ground/src/components/demos";

// 테스트 파일, 내부 컴포넌트 제외
const EXCLUDED_PATTERNS = [
  /\.test\.tsx$/,
  /Compound\.tsx$/,
  /Compounds\.tsx$/,
  /InputField\.tsx$/,
  /InputFooter\.tsx$/,
  /InputClearButton\.tsx$/,
  /InputEyeButton\.tsx$/,
  /InputUnit\.tsx$/,
  /DropdownFooter\.tsx$/,
  /DropdwonIcon\.tsx$/,
  /AlertIcon\.tsx$/,
  /PaginationCompound\.tsx$/,
];

function shouldExclude(filePath: string): boolean {
  return EXCLUDED_PATTERNS.some((pattern) => pattern.test(filePath));
}

function getJSDocDescription(node: Node): string {
  if (!Node.isJSDocable(node)) return "";
  const jsDocs = node.getJsDocs();
  if (!jsDocs || jsDocs.length === 0) return "";

  const jsDoc = jsDocs[0];
  const description = jsDoc.getDescription?.()?.trim() || "";
  return description.split("\n")[0].trim(); // 첫 줄만
}

function getJSDocDefault(node: Node): string | undefined {
  if (!Node.isJSDocable(node)) return undefined;
  const jsDocs = node.getJsDocs();
  if (!jsDocs || jsDocs.length === 0) return undefined;

  const jsDoc = jsDocs[0];
  const tags = jsDoc.getTags?.() || [];

  for (const tag of tags) {
    if (tag.getTagName() === "default") {
      const text = tag.getCommentText?.()?.trim();
      if (text) return text;
    }
  }
  return undefined;
}

function extractPropsFromInterface(
  interfaceDecl: InterfaceDeclaration
): PropItem[] {
  const props: PropItem[] = [];

  for (const prop of interfaceDecl.getProperties()) {
    const name = prop.getName();
    const typeNode = prop.getTypeNode();
    const sourceText = typeNode?.getText() || prop.getType().getText();
    let type = resolveType(prop.getType(), sourceText);

    // 타입 간소화
    type = simplifyType(type);

    const description = getJSDocDescription(prop);
    const defaultValue = getJSDocDefault(prop);
    const required = !prop.hasQuestionToken();

    props.push({
      name,
      type,
      ...(defaultValue && { default: defaultValue }),
      description,
      required,
    });
  }

  return props;
}

/**
 * Type alias가 string/number/boolean literal의 단순 유니온으로
 * resolve되는 경우 확장된 형태를 반환한다.
 * 예: AlignMode → "vertical" | "horizontal"
 *
 * 복잡한 타입(ReactNode 등)은 소스 텍스트를 그대로 유지한다.
 */
function resolveType(type: Type, sourceText: string): string {
  // 유니온 타입인지 확인
  if (type.isUnion()) {
    // optional(?) 프로퍼티의 경우 undefined가 포함되므로 제외
    const nonUndefinedTypes = type
      .getUnionTypes()
      .filter((t) => !t.isUndefined());

    if (nonUndefinedTypes.length > 0) {
      // boolean (true | false) 은 "boolean"으로 유지
      const allBooleanLiterals = nonUndefinedTypes.every((t) =>
        t.isBooleanLiteral()
      );
      if (allBooleanLiterals) {
        return "boolean";
      }

      // string/number 리터럴 유니온은 실제 값으로 확장
      const allLiterals = nonUndefinedTypes.every(
        (t) => t.isStringLiteral() || t.isNumberLiteral()
      );
      if (allLiterals) {
        return nonUndefinedTypes.map((t) => t.getText()).join(" | ");
      }
    }
  }

  // 그 외에는 소스 텍스트 사용
  return sourceText;
}

/**
 * 상속된 프롭의 타입을 정리한다.
 * Props 인터페이스 컨텍스트에서 resolve된 타입에서
 * undefined/null을 제거하고 적절한 타입 문자열을 반환한다.
 *
 * resolveType()과 달리 sourceText 없이 동작하며,
 * CVA VariantProps의 null이나 optional의 undefined를 올바르게 처리한다.
 */
function resolveSupplementedType(type: Type): string {
  if (type.isUnion()) {
    const filtered = type
      .getUnionTypes()
      .filter((t) => !t.isUndefined() && !t.isNull());

    if (filtered.length === 0) return type.getText();

    // boolean (true | false)은 "boolean"으로 유지
    const allBooleanLiterals = filtered.every((t) => t.isBooleanLiteral());
    if (allBooleanLiterals) return "boolean";

    // string/number 리터럴 유니온은 실제 값으로 표시
    const allLiterals = filtered.every(
      (t) => t.isStringLiteral() || t.isNumberLiteral()
    );
    if (allLiterals) {
      return filtered.map((t) => t.getText()).join(" | ");
    }

    // 나머지: 단일 타입이면 그대로, 복수면 조합
    if (filtered.length === 1) {
      return filtered[0].getText();
    }
    return filtered.map((t) => t.getText()).join(" | ");
  }

  return type.getText();
}

function simplifyType(type: string): string {
  // import된 타입 경로 제거
  type = type.replace(/import\([^)]+\)\./g, "");

  // React 네임스페이스 제거
  type = type.replace(/React\./g, "");

  // 긴 유니온 타입 간소화
  if (type.length > 100) {
    if (type.includes("|")) {
      const parts = type.split("|").map((p) => p.trim());
      if (parts.length > 4) {
        return parts.slice(0, 4).join(" | ") + " | ...";
      }
    }
  }

  return type;
}

function findPropsInterface(
  sourceFile: ReturnType<Project["getSourceFile"]>,
  componentName: string
): InterfaceDeclaration | TypeAliasDeclaration | null {
  if (!sourceFile) return null;

  // {ComponentName}Props 인터페이스 찾기
  const propsInterfaceName = `${componentName}Props`;

  const interfaceDecl = sourceFile.getInterface(propsInterfaceName);
  if (interfaceDecl) return interfaceDecl;

  // 타입 별칭도 확인
  const typeAlias = sourceFile.getTypeAlias(propsInterfaceName);
  if (typeAlias) return typeAlias;

  return null;
}

function getComponentDescription(
  sourceFile: ReturnType<Project["getSourceFile"]>,
  componentName: string
): string {
  if (!sourceFile) return "";

  // export된 함수/변수에서 JSDoc 찾기
  const functions = sourceFile.getFunctions();
  for (const fn of functions) {
    if (fn.getName() === componentName) {
      return getJSDocDescription(fn);
    }
  }

  // const 선언 확인
  const variables = sourceFile.getVariableDeclarations();
  for (const variable of variables) {
    if (variable.getName() === componentName) {
      const statement = variable.getVariableStatement();
      if (statement) {
        return getJSDocDescription(statement);
      }
    }
  }

  // default export 확인
  const defaultExport = sourceFile.getDefaultExportSymbol();
  if (defaultExport) {
    const declarations = defaultExport.getDeclarations();
    for (const decl of declarations) {
      const parent = decl.getParent();
      if (parent && Node.isVariableStatement(parent)) {
        return getJSDocDescription(parent);
      }
    }
  }

  return "";
}

/**
 * 컴포넌트 함수의 JSDoc @param 태그를 기반으로
 * 인터페이스에서 직접 추출되지 않은 상속 프롭을 보충한다.
 *
 * 예: Toggle의 checked, disabled는 InputHTMLAttributes에서 상속되므로
 * getProperties()로는 추출되지 않지만, JSDoc @param에 명시되어 있다.
 */
function supplementFromJSDocParams(
  sourceFile: ReturnType<Project["getSourceFile"]>,
  componentName: string,
  propsInterface: InterfaceDeclaration | TypeAliasDeclaration,
  existingProps: PropItem[]
): PropItem[] {
  if (!sourceFile) return existingProps;

  // 컴포넌트 함수/변수에서 JSDoc @param 태그 수집
  const paramDescriptions = new Map<string, string>();

  const collectParams = (node: Node) => {
    if (!Node.isJSDocable(node)) return;

    const jsDocs = node.getJsDocs();
    if (!jsDocs || jsDocs.length === 0) return;

    for (const jsDoc of jsDocs) {
      const tags = jsDoc.getTags?.() || [];

      for (const tag of tags) {
        if (tag.getTagName() === "param") {
          const text = tag.getCommentText?.()?.trim() || "";
          // @param name - description 형식에서 name과 description 분리
          const paramName = tag.getText?.()?.match(/@param\s+(\w+)/)?.[1];

          if (paramName && text) {
            // "- description" 형식에서 "- " 제거
            const desc = text.replace(/^-\s*/, "").split("\n")[0].trim();
            paramDescriptions.set(paramName, desc);
          }
        }
      }
    }
  };

  // 함수 선언과 변수 선언 모두 확인
  for (const fn of sourceFile.getFunctions()) {
    if (fn.getName() === componentName) collectParams(fn);
  }
  for (const variable of sourceFile.getVariableDeclarations()) {
    if (variable.getName() === componentName) {
      const statement = variable.getVariableStatement();
      if (statement) collectParams(statement);
    }
  }

  if (paramDescriptions.size === 0) return existingProps;

  // 이미 추출된 prop 이름 집합
  const existingNames = new Set(existingProps.map((p) => p.name));

  // Props 타입의 전체 프로퍼티 (상속 포함)
  const fullType = propsInterface.getType();
  const allProperties = fullType.getProperties();
  const propSymbolMap = new Map<string, TsSymbol>();
  for (const sym of allProperties) {
    propSymbolMap.set(sym.getName(), sym);
  }

  // @param에 있지만 직접 추출되지 않은 프롭 보충
  const supplemented = [...existingProps];
  for (const [paramName, paramDesc] of paramDescriptions) {
    if (existingNames.has(paramName)) continue;

    const symbol = propSymbolMap.get(paramName);
    if (!symbol) continue;

    const declarations = symbol.getDeclarations();
    const decl = declarations[0];
    if (!decl) continue;

    // Props 인터페이스 컨텍스트에서 타입 resolve (상속된 타입이 정확히 해석됨)
    let resolvedType = symbol.getTypeAtLocation(propsInterface);
    let type = resolveSupplementedType(resolvedType);
    type = simplifyType(type);

    // CVA VariantProps 등에서 object shape이 반환될 경우
    // 유니온 멤버 타입에서 re-resolve
    if (type.startsWith("{") && fullType.isUnion()) {
      for (const memberType of fullType.getUnionTypes()) {
        const memberProp = memberType.getProperty(paramName);
        if (memberProp) {
          const memberTypeSymbol = memberType.getSymbol();
          const memberDecl = memberTypeSymbol?.getDeclarations()?.[0];
          if (memberDecl) {
            resolvedType = memberProp.getTypeAtLocation(memberDecl);
            type = resolveSupplementedType(resolvedType);
            type = simplifyType(type);
            if (!type.startsWith("{")) break;
          }
        }
      }
    }

    // optional 여부
    const required = Node.isPropertySignature(decl)
      ? !decl.hasQuestionToken()
      : false;

    supplemented.push({
      name: paramName,
      type,
      description: paramDesc,
      required,
    });
  }

  return supplemented;
}

function extractComponentName(filePath: string): string {
  const fileName = path.basename(filePath, ".tsx");
  return fileName;
}

function getRelativePath(filePath: string): string {
  // src/components/... 형태로 변환
  const match = filePath.match(/src\/components\/.+/);
  return match ? match[0] : filePath;
}

async function main() {
  const project = new Project({
    tsConfigFilePath: "packages/library/tsconfig.json",
  });

  const componentsPath = path.resolve(COMPONENTS_DIR);
  const sourceFiles = project.getSourceFiles(`${componentsPath}/**/*.tsx`);

  const components: ComponentInfo[] = [];

  for (const sourceFile of sourceFiles) {
    const filePath = sourceFile.getFilePath();

    if (shouldExclude(filePath)) {
      continue;
    }

    const componentName = extractComponentName(filePath);
    const propsInterface = findPropsInterface(sourceFile, componentName);

    if (!propsInterface) {
      continue;
    }

    let props: PropItem[] = [];

    if (Node.isInterfaceDeclaration(propsInterface)) {
      props = extractPropsFromInterface(propsInterface);
    } else if (Node.isTypeAliasDeclaration(propsInterface)) {
      // TypeAlias의 경우 타입 노드에서 프로퍼티 추출
      const typeNode = propsInterface.getTypeNode();

      if (typeNode && Node.isTypeLiteral(typeNode)) {
        for (const member of typeNode.getMembers()) {
          if (Node.isPropertySignature(member)) {
            const name = member.getName();
            const memberTypeNode = member.getTypeNode();
            const memberSourceText =
              memberTypeNode?.getText() || member.getType().getText();
            let type = resolveType(member.getType(), memberSourceText);
            type = simplifyType(type);

            const description = getJSDocDescription(member);
            const defaultValue = getJSDocDefault(member);
            const required = !member.hasQuestionToken();

            props.push({
              name,
              type,
              ...(defaultValue && { default: defaultValue }),
              description,
              required,
            });
          }
        }
      }
    }

    // JSDoc @param 태그로 상속 프롭 보충
    props = supplementFromJSDocParams(
      sourceFile,
      componentName,
      propsInterface,
      props
    );

    if (props.length === 0) {
      continue;
    }

    const description = getComponentDescription(sourceFile, componentName);
    const relativePath = getRelativePath(filePath);

    components.push({
      name: componentName,
      path: relativePath,
      description,
      props,
    });
  }

  // 이름순 정렬
  components.sort((a, b) => a.name.localeCompare(b.name));

  // 버전 정보 읽기
  const packageJsonPath = path.resolve("packages/library/package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

  const extractedData: ExtractedData = {
    version: packageJson.version,
    extractedAt: new Date().toISOString(),
    components,
  };

  // 출력 디렉토리 확인
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // JSON 파일 출력
  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(extractedData, null, 2),
    "utf-8"
  );

  // Demo 파일의 Props 배열 업데이트
  const updatedFiles = updateDemoFiles(components);

  console.log(`Extracted ${components.length} components to ${OUTPUT_FILE}`);
  console.log(`Version: ${extractedData.version}`);
  console.log("Components:", components.map((c) => c.name).join(", "));
  if (updatedFiles.length > 0) {
    console.log(`Updated demo files: ${updatedFiles.join(", ")}`);
  }
}

function toCamelCase(name: string): string {
  return name.charAt(0).toLowerCase() + name.slice(1);
}

/**
 * 쌍따옴표 포함 시 홑따옴표로, 그 외에는 JSON.stringify로 감싸기.
 * JSON.stringify만 사용하면 "md" → "\"md\"" 가 되어 역슬래시가 누적된다.
 */
function quoteValue(value: string): string {
  if (value.includes('"') && !value.includes("'")) {
    return `'${value}'`;
  }
  return JSON.stringify(value);
}

function buildPropLine(prop: PropItem): string {
  const parts: string[] = [];
  parts.push(`name: ${JSON.stringify(prop.name)}`);
  parts.push(`type: ${quoteValue(prop.type)}`);
  if (prop.default) {
    parts.push(`default: ${quoteValue(prop.default)}`);
  }
  parts.push(`description: ${quoteValue(prop.description)}`);
  parts.push(`required: ${prop.required}`);
  return `  { ${parts.join(", ")} },`;
}

function updateDemoFiles(components: ComponentInfo[]): string[] {
  const demosPath = path.resolve(DEMOS_DIR);
  if (!fs.existsSync(demosPath)) return [];

  const demoFiles = fs.readdirSync(demosPath).filter((f) => f.endsWith(".tsx"));
  const updatedFiles: string[] = [];

  // 컴포넌트 이름 → props 매핑
  const propsMap = new Map<string, Map<string, PropItem>>();
  for (const component of components) {
    const varName = `${toCamelCase(component.name)}Props`;
    const propsByName = new Map<string, PropItem>();
    for (const prop of component.props) {
      propsByName.set(prop.name, prop);
    }
    propsMap.set(varName, propsByName);
  }

  for (const demoFile of demoFiles) {
    const filePath = path.join(demosPath, demoFile);
    let content = fs.readFileSync(filePath, "utf-8");
    let modified = false;

    for (const [varName, propsByName] of propsMap) {
      // const xxxProps = [ ... ]; 패턴 매칭
      const arrayRegex = new RegExp(
        `(const ${varName}\\s*=\\s*\\[)([\\s\\S]*?)(\\];)`,
        "m"
      );

      const arrayMatch = content.match(arrayRegex);
      if (!arrayMatch) continue;

      const arrayBody = arrayMatch[2];
      // 각 줄을 순회하면서 매칭되는 prop 라인만 교체
      const lines = arrayBody.split("\n");
      const propLineRegex = /^(\s*\{[^}]*name:\s*["'])(\w+)(['"][^}]*\},?)$/;
      let anyLineChanged = false;
      const existingPropNames = new Set<string>();

      const newLines = lines.map((line) => {
        const lineMatch = line.match(propLineRegex);
        if (!lineMatch) return line; // prop 라인이 아니면 원본 유지

        const propName = lineMatch[2];
        existingPropNames.add(propName);
        const extractedProp = propsByName.get(propName);
        if (!extractedProp) return line; // 추출 데이터에 없으면 원본 유지

        // 추출 데이터에 default가 없으면 기존 라인의 default 보존
        let propToWrite = extractedProp;
        if (!propToWrite.default) {
          const defaultMatch = line.match(/default:\s*(?:"([^"]*)"|'([^']*)')/);
          if (defaultMatch) {
            propToWrite = {
              ...propToWrite,
              default: defaultMatch[1] ?? defaultMatch[2],
            };
          }
        }

        const newLine = buildPropLine(propToWrite);
        if (newLine !== line) {
          anyLineChanged = true;
          return newLine;
        }
        return line;
      });

      // 추출 데이터에는 있지만 데모 파일에 없는 prop 추가
      const missingProps: string[] = [];
      for (const [propName, propItem] of propsByName) {
        if (!existingPropNames.has(propName)) {
          missingProps.push(buildPropLine(propItem));
        }
      }

      if (missingProps.length > 0) {
        // 마지막 prop 라인 뒤에 추가
        let lastPropIdx = -1;
        for (let i = newLines.length - 1; i >= 0; i--) {
          if (propLineRegex.test(newLines[i])) {
            lastPropIdx = i;
            break;
          }
        }
        if (lastPropIdx !== -1) {
          newLines.splice(lastPropIdx + 1, 0, ...missingProps);
        }
        anyLineChanged = true;
      }

      if (anyLineChanged) {
        const newArrayBody = newLines.join("\n");
        content = content.replace(
          arrayRegex,
          `${arrayMatch[1]}${newArrayBody}${arrayMatch[3]}`
        );
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, "utf-8");
      updatedFiles.push(demoFile);
    }
  }

  return updatedFiles;
}

main().catch(console.error);
