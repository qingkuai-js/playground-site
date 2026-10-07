var e=`import type { COMPONENT } from '../language-service/brand.d.ts';\r
import type { EMPTY_SIGN } from '../language-service/brand.d.ts';\r
import type { EmptyObject } from '../language-service/brand.d.ts';\r
import type { QingkuaiComponent } from '../language-service/brand.d.ts';\r
\r
declare type AccessorWrapper = BaseWrapper & AccessorWrapperExtra\r
\r
declare interface AccessorWrapperExtra {\r
    s: Subscription | null // sync subscriptions\r
    a: Subscription | null // async subscriptions\r
}\r
\r
declare type AnyObject = Record<ObjectKeys, any>\r
\r
declare type ArbitraryFunc<R = any> = (...args: any) => R\r
\r
declare interface BaseWrapper {\r
    r: any // raw\r
    p: any // proxy\r
    l: number // flag\r
    o: ObjectKeys[] | null // own keys\r
    b: ReactivityWrapper | null // inherit by\r
    c: Set<ReactivityWrapper> | null // derived children\r
}\r
\r
export declare function batchAndNoTracking<R>(fn: ArbitraryFunc<R>): R;\r
\r
export declare function batchUpdating<R>(fn: ArbitraryFunc<R>): R;\r
\r
export declare type BoundEffectFunc = (callback: EffectCallback) => EffectHandle\r
\r
export declare type BoundLifecycleFunc = (callback: GeneralFunc) => void\r
\r
export declare type BoundSetContextFunc<T extends QingkuaiComponent<any>> = [\r
Exclude<keyof ComponentContexts<T>, typeof EMPTY_SIGN>\r
] extends [never]\r
? (key: never, value: never) => void\r
: <K extends keyof ComponentContexts<T>>(key: K, value: ComponentContexts<T>[K]) => void\r
\r
export declare type BoundSetContextGetterFunc<T extends QingkuaiComponent<any>> = [\r
Exclude<keyof ComponentContexts<T>, typeof EMPTY_SIGN>\r
] extends [never]\r
? (key: never, getter: never) => void\r
: <K extends keyof ComponentContexts<T>>(\r
key: K,\r
getter: Getter<ComponentContexts<T>[K]>\r
) => void\r
\r
export declare type BoundWatchFunc = <T>(getter: Getter<T>, callback: WatchCallback<T>) => EffectHandle\r
\r
/**\r
 * Extracts the **contexts contract** of a Qingkuai component.\r
 *\r
 * The contexts contract describes the key/value mapping the component writes\r
 * through \`setContext\`-related APIs and reads through the \`contexts\`\r
 * identifier. Typical use case: type-checking runtime context writes (see\r
 * \`setContext\` and \`setContextGetter\`) or reading context types in tooling.\r
 *\r
 * When the component does not carry a contexts contract (for example, a value\r
 * typed as \`QingkuaiComponent<any>\`), the result degrades to a permissive\r
 * record type.\r
 *\r
 * Examples:\r
 * \`\`\`ts\r
 * type Contexts = ComponentContexts<typeof ThemeProvider>\r
 * \`\`\`\r
 *\r
 * @template T A Qingkuai component type.\r
 */\r
export declare type ComponentContexts<T extends QingkuaiComponent<any>> = ComponentMember<T, "contexts">\r
\r
/**\r
 * Extracts the **exported data** of a Qingkuai component.\r
 *\r
 * The exported data is mounted on the component instance, producing the\r
 * instance type (see {@link ComponentInstance}). Typical use case: reading\r
 * the data a component exports when passing instances between modules or\r
 * writing component utilities.\r
 *\r
 * Examples:\r
 * \`\`\`ts\r
 * type Exports = ComponentExports<typeof Counter>\r
 * \`\`\`\r
 *\r
 * @template T A Qingkuai component type.\r
 */\r
export declare type ComponentExports<T extends QingkuaiComponent<any>> =\r
T extends QingkuaiComponent<infer F> ? ReturnType<F> : any\r
\r
export declare type ComponentInstance<T extends QingkuaiComponent<any>> = ComponentInstanceBase &\r
Readonly<ComponentExports<T>> & { [COMPONENT]?: T }\r
\r
declare interface ComponentInstanceBase {\r
    host: Element\r
    parent: ComponentInstanceBase | null\r
\r
    /* Excluded from this release type: _internal */}\r
\r
declare type ComponentMember<T extends QingkuaiComponent<any>, K> =\r
T extends QingkuaiComponent<infer F>\r
? F extends (ctx: infer C) => any\r
? K extends keyof C\r
? C[K]\r
: any\r
: any\r
: any\r
\r
declare type ComponentMeta = Partial<{\r
    d: Destruction\r
    l: number // flag\r
    D: DefaultValues // defaults\r
    s: AnyObject // raw slots\r
    h: Setter // handle setter\r
    p: AnyObject // raw props\r
    P: AnyObject // bound props\r
    r: AnyObject // raw refs\r
    c: AnyObject // contexts\r
    R: AnyObject // bound refs\r
    e: string[] // delegated events\r
    a: string[] // ancestor scope chain\r
    f: GeneralFunc[][] | null // lifecycle hooks\r
}>\r
\r
/**\r
 * Recovers the component type that produced a component instance.\r
 *\r
 * The instance type carries its component type through an invisible\r
 * type-level channel (see {@link ComponentInstance}) — this helper extracts\r
 * it. Typical use case: deriving the component's contract types (see\r
 * {@link ComponentProps}, {@link ComponentContexts}, ... ) from an instance\r
 * obtained at an entry point such as \`getCurrentInstance\` or an \`&handle\`\r
 * receiver.\r
 *\r
 * Falls back to \`QingkuaiComponent<any>\` (permissive) for instances that do\r
 * not carry the channel.\r
 *\r
 * Examples:\r
 * \`\`\`ts\r
 * type Comp = ComponentOfInstance<typeof instance>\r
 * type Contexts = ComponentContexts<Comp>\r
 * \`\`\`\r
 *\r
 * @template I A component instance type.\r
 */\r
declare type ComponentOfInstance<I> = I extends {\r
    [COMPONENT]?: infer T\r
}\r
? T\r
: QingkuaiComponent<any>\r
\r
/**\r
 * Extracts the **props contract** of a Qingkuai component.\r
 *\r
 * The props contract describes the properties a parent may pass to the\r
 * component, as declared by the component itself. Typical use case: reading\r
 * component prop types when writing wrapper components or higher-order\r
 * component utilities.\r
 *\r
 * When the component does not carry a props contract (for example, a value\r
 * typed as \`QingkuaiComponent<any>\`), the result degrades to a permissive\r
 * record type.\r
 *\r
 * Examples:\r
 * \`\`\`ts\r
 * type Props = ComponentProps<typeof Counter>\r
 * \`\`\`\r
 *\r
 * @template T A Qingkuai component type.\r
 */\r
export declare type ComponentProps<T extends QingkuaiComponent<any>> = ComponentMember<T, "props">\r
\r
/**\r
 * Extracts the **refs contract** of a Qingkuai component.\r
 *\r
 * The refs contract describes the template references the component exposes\r
 * to its parent through \`&\`-prefixed attributes. Typical use case: reading\r
 * component ref types when writing wrapper components or debugging tools.\r
 *\r
 * When the component does not carry a refs contract (for example, a value\r
 * typed as \`QingkuaiComponent<any>\`), the result degrades to a permissive\r
 * record type.\r
 *\r
 * Examples:\r
 * \`\`\`ts\r
 * type Refs = ComponentRefs<typeof Form>\r
 * \`\`\`\r
 *\r
 * @template T A Qingkuai component type.\r
 */\r
export declare type ComponentRefs<T extends QingkuaiComponent<any>> = ComponentMember<T, "refs">\r
\r
/**\r
 * The shape accepted by {@link DeclareComponent}, five optional members, one\r
 * per component layer. Omitted members default to \`EmptyObject\`, matching the\r
 * compiled behavior of components that declare nothing for the corresponding\r
 * layer.\r
 */\r
export declare type ComponentShape = {\r
    props?: AnyObject\r
    refs?: AnyObject\r
    slots?: AnyObject\r
    contexts?: AnyObject\r
    exports?: AnyObject\r
}\r
\r
/**\r
 * Extracts the **slots contract** of a Qingkuai component.\r
 *\r
 * The slots contract describes the named slots the component accepts from\r
 * its parent. Typical use case: reading slot types when writing wrapper\r
 * components or slot-forwarding utilities.\r
 *\r
 * When the component does not carry a slots contract (for example, a value\r
 * typed as \`QingkuaiComponent<any>\`), the result degrades to a permissive\r
 * record type.\r
 *\r
 * Examples:\r
 * \`\`\`ts\r
 * type Slots = ComponentSlots<typeof Layout>\r
 * \`\`\`\r
 *\r
 * @template T A Qingkuai component type.\r
 */\r
export declare type ComponentSlots<T extends QingkuaiComponent<any>> = ComponentMember<T, "slots">\r
\r
// Generated by build-types script
/**\r
 * Creates a shared reactive state store that can be imported and used\r
 * across multiple components.\r
 *\r
 * Typical use case: centralize application state such as user session,\r
 * global configuration, or shared data that multiple components need\r
 * to read and update together.\r
 *\r
 * The returned object is reactive, so any property changes will\r
 * automatically trigger updates in all components that access it.\r
 *\r
 * Examples:\r
 * \`\`\`ts\r
 * // Store module: create and export shared state.\r
 * import { createStore } from "qingkuai"\r
 *\r
 * export const store = createStore({\r
 *     isLogin: false,\r
 *     userInfo: null,\r
 *     // other shared properties...\r
 * })\r
 *\r
 * // Component module: import and use the store.\r
 * import { store } from "./store"\r
 *\r
 * // Any changes to store.isLogin trigger updates in all components\r
 * // that access it.\r
 * if (store.isLogin) {\r
 *     console.log("Logged in as:", store.userInfo.name)\r
 * }\r
 * \`\`\`\r
 *\r
 * @param value Initial state object with properties to share.\r
 * @returns A reactive proxy wrapping the initial state object.\r
 */
export declare function createShallowStore<T extends AnyObject>(value: T): T\r
\r
// Generated by build-types script
/**\r
 * Creates a shared reactive state store that can be imported and used\r
 * across multiple components.\r
 *\r
 * Typical use case: centralize application state such as user session,\r
 * global configuration, or shared data that multiple components need\r
 * to read and update together.\r
 *\r
 * The returned object is reactive, so any property changes will\r
 * automatically trigger updates in all components that access it.\r
 *\r
 * Examples:\r
 * \`\`\`ts\r
 * // Store module: create and export shared state.\r
 * import { createStore } from "qingkuai"\r
 *\r
 * export const store = createStore({\r
 *     isLogin: false,\r
 *     userInfo: null,\r
 *     // other shared properties...\r
 * })\r
 *\r
 * // Component module: import and use the store.\r
 * import { store } from "./store"\r
 *\r
 * // Any changes to store.isLogin trigger updates in all components\r
 * // that access it.\r
 * if (store.isLogin) {\r
 *     console.log("Logged in as:", store.userInfo.name)\r
 * }\r
 * \`\`\`\r
 *\r
 * @param value Initial state object with properties to share.\r
 * @returns A reactive proxy wrapping the initial state object.\r
 */
export declare function createStore<T extends AnyObject>(value: T): T\r
\r
/**\r
 * Manually declares a component shape, producing the component type that\r
 * compiled component files carry. For wrapper contracts, component-typed\r
 * module parameters, and type-level stubs.\r
 *\r
 * The shape has five optional members. Omitted members default to\r
 * \`EmptyObject\`, matching the compiled behavior of components that declare\r
 * nothing for the corresponding layer.\r
 *\r
 * Component types with different shapes are mutually exclusive.\r
 *\r
 * Examples:\r
 * \`\`\`ts\r
 * type Dialog = DeclareComponent<{\r
 *     props: { title: string }\r
 *     exports: { open: () => void }\r
 * }>\r
 * \`\`\`\r
 *\r
 * @template S The manually declared component shape.\r
 */\r
export declare type DeclareComponent<S extends ComponentShape> = QingkuaiComponent<\r
(ctx: {\r
    props: S["props"] extends AnyObject ? S["props"] : EmptyObject\r
    refs: S["refs"] extends AnyObject ? S["refs"] : EmptyObject\r
    slots: S["slots"] extends AnyObject ? S["slots"] : EmptyObject\r
    contexts: S["contexts"] extends AnyObject ? S["contexts"] : EmptyObject\r
}) => S["exports"] extends AnyObject ? S["exports"] : void\r
>\r
\r
declare type DeclaredContextKeys<I extends ComponentInstance<any>> = Exclude<\r
keyof InstanceContexts<I>,\r
typeof EMPTY_SIGN\r
>\r
\r
declare function decreBatchSyncDepth(): number;\r
\r
declare function decreSchedulingPauseDepth(): number;\r
\r
declare type DefaultValues = Partial<Record<"props" | "refs" | "contexts", AnyObject>>\r
\r
export declare const DESTRUCT_HTML: HtmlBlockOptions;\r
\r
declare interface Destruction {\r
    d: boolean // disposed\r
    f: number // fragment flag\r
    e: Effect[] | null // effects\r
    p: Destruction | null // parent\r
    n: ChildNode | null // end node\r
    s: ChildNode | null // start node\r
    a: GeneralFunc[] | null // cleaners\r
    c: Destruction[] | null // children\r
    m: ComponentInstance<any> | null // component\r
}\r
\r
declare interface Effect {\r
    f: ArbitraryFunc\r
    i: number // id\r
    l: number // flag\r
    t: number // timing\r
    k: Link[] // dependencies\r
    x: number // index in Destruction.e\r
    d: Destruction | null // destruction\r
    c: GeneralFunc | null // cleaner between two runs\r
    g?: Getter // getter (WatchEffect)\r
    v?: any // value (WatchEffect)\r
}\r
\r
// Generated by build-types script
/**\r
 * Registers a reactive side effect and reruns it when tracked\r
 * dependencies change.\r
 *\r
 * Typical use case: run async requests, logging, or integration logic\r
 * that should respond to reactive state updates.\r
 *\r
 * Binding:\r
 * - The first argument is the component instance the effect binds to.\r
 *   When the component is destroyed, the effect is cleaned up\r
 *   automatically — regardless of whether it was registered in sync or\r
 *   async logic.\r
 * - Passing \`null\` instead of an instance binds the effect to no\r
 *   component, so it is never auto-cleaned; the caller must manage its\r
 *   lifecycle by calling \`stop()\`.\r
 *\r
 * Trigger timing:\r
 * - Dependencies are collected from reactive values accessed while the\r
 *   callback executes.\r
 * - The concrete trigger timing depends on the API that uses this\r
 *   signature (effect, preEffect, postEffect, or syncEffect).\r
 * - Non-sync variants are scheduled asynchronously; their callbacks run\r
 *   after the current task settles.\r
 *\r
 * Callback:\r
 * - May return a cleanup function that runs before the next execution\r
 *   and when the effect is stopped.\r
 *\r
 * Returned object:\r
 * - \`stop()\` completely stops the effect and releases resources.\r
 * - \`pause()\` temporarily suspends rerunning the effect.\r
 * - \`resume()\` resumes a previously paused effect.\r
 *\r
 * Examples:\r
 * \`\`\`ts\r
 * const handle = effect(instance, () => {\r
 *     // This reruns when reactive values used here change.\r
 *     console.log(\`current count: \${count}\`)\r
 * })\r
 *\r
 * count = 1 // console logs: "current count: 1"\r
 *\r
 * handle.pause()\r
 * count = 2 // effect not rerun\r
 *\r
 * handle.resume()\r
 * count = 3 // console logs: "current count: 3"\r
 *\r
 * handle.stop()\r
 * count = 4 // effect not rerun\r
 *\r
 * // Unbound effect: cleaned up manually.\r
 * const handle = syncEffect(null, () => {\r
 *     // Sync to external services.\r
 *     console.log(\`syncing count: \${count}\`)\r
 * })\r
 *\r
 * handle.stop()\r
 * \`\`\`\r
 *\r
 * @param instance The component instance to bind the effect to, or \`null\` to leave it unbound.\r
 * @param callback Contains side-effect logic and optional cleanup return.\r
 * @returns A control handle with stop, pause, and resume methods.\r
 */
export declare function effect(instance: ComponentInstance<any> | null, callback: EffectCallback): EffectHandle\r
\r
export declare type EffectCallback = () => void | GeneralFunc\r
\r
export declare type EffectHandle = Record<"stop" | "pause" | "resume", GeneralFunc>\r
\r
declare type GeneralFunc = () => void\r
\r
// Generated by build-types script
/**\r
 * Returns the contexts chain-head object of the specified component\r
 * instance.\r
 *\r
 * The returned object is typed with the context contract of the\r
 * component (see {@link ComponentContexts}) — declared context keys and\r
 * their value types are preserved.\r
 *\r
 * Reads inherit parent/ancestor contexts along the prototype chain\r
 * automatically.\r
 *\r
 * @param instance The target component instance.\r
 */
export declare function getContexts<I extends ComponentInstance<any>>(instance: I): InstanceContexts<I> | null\r
\r
// Generated by build-types script
/**\r
 * Returns the component instance that is currently being initialized or\r
 * updated.\r
 *\r
 * Typical use case: pass the instance to external APIs (framework APIs\r
 * like \`setContext\`, or third-party functions that accept instances), or\r
 * register watchers, effects, and lifecycle hooks that are bound to the\r
 * current component. The obtained instance can also be passed to \`watch\`\r
 * or \`effect\` from external logic, so the watcher or effect is cleaned up\r
 * automatically when the component is destroyed.\r
 *\r
 * Note：\r
 * - This function only returns the correct instance during synchronous\r
 *   execution of a component's initialization or update phase. The result\r
 *   is unreliable in asynchronous logic such as \`setTimeout\`,\r
 *   \`Promise.then\`, or event handlers — call it synchronously and capture\r
 *   the instance before using it later.\r
 * - Exported data is mounted on the instance only after the component's\r
 *   \`mount\` completes. Reading exports synchronously during initialization\r
 *   returns \`undefined\`, even when the type suggests otherwise.\r
 *\r
 * Examples:\r
 * \`\`\`ts\r
 * // Get the current component instance (permissive typing).\r
 * const instance = getCurrentInstance()\r
 *\r
 * // Pass a component type for contract-typed access.\r
 * const typed = getCurrentInstance<typeof Comp>()\r
 * const typedContexts = getContexts(typed)\r
 * typedContexts.theme\r
 * \`\`\`\r
 *\r
 * @returns The current component instance, or \`null\` when no component\r
 * is active.\r
 */
export declare function getCurrentInstance<T extends QingkuaiComponent<any> = QingkuaiComponent<any>>(): ComponentInstance<T> | null\r
\r
declare type Getter<T = any> = () => T\r
\r
/**\r
 * Configures escaping behavior for HTML block rendering.\r
 *\r
 * Typical use case: allow specific tags while keeping style or script\r
 * content escaped for safer output.\r
 *\r
 * - \`escapeTags\`: tag names that should be escaped.\r
 * - \`escapeStyle\`: whether style content should be escaped.\r
 * - \`escapeScript\`: whether script content should be escaped.\r
 *\r
 * Examples:\r
 * \`\`\`ts\r
 * const options: HtmlBlockOptions = {\r
 *     // Keep script/style escaped, but escape iframe tags explicitly.\r
 *     escapeTags: ["iframe"]\r
 * }\r
 *\r
 * const options: HtmlBlockOptions = {\r
 *     // Disable style escaping for trusted CSS content.\r
 *     escapeStyle: false,\r
 *     // Keep script escaping enabled for safety.\r
 *     escapeScript: true\r
 * }\r
 * \`\`\`\r
 */\r
export declare type HtmlBlockOptions = Partial<{\r
    escapeTags: string[]\r
    escapeStyle: boolean\r
    escapeScript: boolean\r
}>\r
\r
declare function increBatchSyncDepth(): number;\r
\r
declare function increSchedulingPauseDepth(): number;\r
\r
declare type InstanceContexts<I extends ComponentInstance<any>> = ComponentContexts<\r
ComponentOfInstance<I>\r
>\r
\r
declare interface Link {\r
    e: Effect\r
    l: number // flag\r
    i: number // index in Subscription.k\r
    s: Subscription // subscription which it belongs\r
}\r
\r
// Generated by build-types script
/**\r
 * Mounts a Qingkuai component to a target container.\r
 *\r
 * Typical use case: start an app by attaching its root component to\r
 * an existing DOM element or a CSS selector.\r
 *\r
 * If the target is a selector string, the runtime resolves it to an\r
 * element before mounting.\r
 *\r
 * Examples:\r
 * \`\`\`ts\r
 * // Mount by passing a real DOM element.\r
 * const container = document.getElementById("app")!\r
 * mountApp(App, container)\r
 *\r
 * // Mount by passing a selector.\r
 * mountApp(App, "#app")\r
 * \`\`\`\r
 *\r
 * @param component The component to mount as the app root.\r
 * @param target Mount container element or selector string.\r
 */
export declare function mountApp(component: QingkuaiComponent<any>, target: Element | string): void\r
\r
// Generated by build-types script
/**\r
 * Schedules a callback to run after the current execution completes.\r
 *\r
 * Typical use case: wait for reactive updates to flush before making\r
 * assertions in tests or performing post-update operations.\r
 *\r
 * Uses the microtask queue (Promise.then), so the callback runs after\r
 * synchronous execution finishes but before the next UI render.\r
 *\r
 * Examples:\r
 * \`\`\`ts\r
 * // Wait for reactive state updates to settle.\r
 * let count = 0\r
 *\r
 * effect(() => {\r
 *     count++\r
 * })\r
 *\r
 * await nextTick()\r
 * // At this point, all scheduled updates have completed.\r
 * console.log(count) // 1\r
 *\r
 * // Provide a callback instead of awaiting.\r
 * nextTick(() => {\r
 *     console.log("updates finished")\r
 * })\r
 * \`\`\`\r
 *\r
 * @param callback A function to run in the next microtask. Optional.\r
 * @returns A promise that resolves after the callback runs (or\r
 * immediately if no callback was provided).\r
 */
export declare function nextTick(callback?: GeneralFunc): Promise<void>\r
\r
export declare function noTracking<R>(fn: ArbitraryFunc<R>): R;\r
\r
export declare function noUpdating<R>(fn: ArbitraryFunc<R>): R;\r
\r
declare type ObjectKeys = string | number | symbol\r
\r
// Generated by build-types script
/**\r
 * Registers a lifecycle hook callback for component-level side effects.\r
 *\r
 * Typical use case: attach setup or teardown logic to a component phase,\r
 * such as reading refs after mount or releasing resources before destroy.\r
 *\r
 * The callback is invoked when the corresponding lifecycle phase is\r
 * reached.\r
 *\r
 * The target instance must be passed explicitly — this is the external\r
 * form. Inside components the built-in binding closures inject the\r
 * instance automatically, so the hook is called with the callback alone.\r
 *\r
 * Example:\r
 * \`\`\`ts\r
 * onMounted(instance, () => {\r
 *     unsubscribe()\r
 * }) // runs once before the component is destroyed\r
 * \`\`\`\r
 *\r
 * @param instance The target component instance.\r
 * @param callback Contains logic to run at the target lifecycle phase.\r
 */
export declare function onAfterDestroy(instance: ComponentInstance<any>, callback: GeneralFunc): void\r
\r
// Generated by build-types script
/**\r
 * Registers a lifecycle hook callback for component-level side effects.\r
 *\r
 * Typical use case: attach setup or teardown logic to a component phase,\r
 * such as reading refs after mount or releasing resources before destroy.\r
 *\r
 * The callback is invoked when the corresponding lifecycle phase is\r
 * reached.\r
 *\r
 * The target instance must be passed explicitly — this is the external\r
 * form. Inside components the built-in binding closures inject the\r
 * instance automatically, so the hook is called with the callback alone.\r
 *\r
 * Example:\r
 * \`\`\`ts\r
 * onMounted(instance, () => {\r
 *     unsubscribe()\r
 * }) // runs once before the component is destroyed\r
 * \`\`\`\r
 *\r
 * @param instance The target component instance.\r
 * @param callback Contains logic to run at the target lifecycle phase.\r
 */
export declare function onAfterMount(instance: ComponentInstance<any>, callback: GeneralFunc): void\r
\r
// Generated by build-types script
/**\r
 * Registers a lifecycle hook callback for component-level side effects.\r
 *\r
 * Typical use case: attach setup or teardown logic to a component phase,\r
 * such as reading refs after mount or releasing resources before destroy.\r
 *\r
 * The callback is invoked when the corresponding lifecycle phase is\r
 * reached.\r
 *\r
 * The target instance must be passed explicitly — this is the external\r
 * form. Inside components the built-in binding closures inject the\r
 * instance automatically, so the hook is called with the callback alone.\r
 *\r
 * Example:\r
 * \`\`\`ts\r
 * onMounted(instance, () => {\r
 *     unsubscribe()\r
 * }) // runs once before the component is destroyed\r
 * \`\`\`\r
 *\r
 * @param instance The target component instance.\r
 * @param callback Contains logic to run at the target lifecycle phase.\r
 */
export declare function onAfterUpdate(instance: ComponentInstance<any>, callback: GeneralFunc): void\r
\r
// Generated by build-types script
/**\r
 * Registers a lifecycle hook callback for component-level side effects.\r
 *\r
 * Typical use case: attach setup or teardown logic to a component phase,\r
 * such as reading refs after mount or releasing resources before destroy.\r
 *\r
 * The callback is invoked when the corresponding lifecycle phase is\r
 * reached.\r
 *\r
 * The target instance must be passed explicitly — this is the external\r
 * form. Inside components the built-in binding closures inject the\r
 * instance automatically, so the hook is called with the callback alone.\r
 *\r
 * Example:\r
 * \`\`\`ts\r
 * onMounted(instance, () => {\r
 *     unsubscribe()\r
 * }) // runs once before the component is destroyed\r
 * \`\`\`\r
 *\r
 * @param instance The target component instance.\r
 * @param callback Contains logic to run at the target lifecycle phase.\r
 */
export declare function onBeforeDestroy(instance: ComponentInstance<any>, callback: GeneralFunc): void\r
\r
// Generated by build-types script
/**\r
 * Registers a lifecycle hook callback for component-level side effects.\r
 *\r
 * Typical use case: attach setup or teardown logic to a component phase,\r
 * such as reading refs after mount or releasing resources before destroy.\r
 *\r
 * The callback is invoked when the corresponding lifecycle phase is\r
 * reached.\r
 *\r
 * The target instance must be passed explicitly — this is the external\r
 * form. Inside components the built-in binding closures inject the\r
 * instance automatically, so the hook is called with the callback alone.\r
 *\r
 * Example:\r
 * \`\`\`ts\r
 * onMounted(instance, () => {\r
 *     unsubscribe()\r
 * }) // runs once before the component is destroyed\r
 * \`\`\`\r
 *\r
 * @param instance The target component instance.\r
 * @param callback Contains logic to run at the target lifecycle phase.\r
 */
export declare function onBeforeUpdate(instance: ComponentInstance<any>, callback: GeneralFunc): void\r
\r
export declare const pauseTracking: typeof pushTrackingStack;\r
\r
export declare const pauseUpdating: typeof increSchedulingPauseDepth;\r
\r
declare function popTrackingStack(): boolean;\r
\r
// Generated by build-types script
/**\r
 * Registers a reactive side effect and reruns it when tracked\r
 * dependencies change.\r
 *\r
 * Typical use case: run async requests, logging, or integration logic\r
 * that should respond to reactive state updates.\r
 *\r
 * Binding:\r
 * - The first argument is the component instance the effect binds to.\r
 *   When the component is destroyed, the effect is cleaned up\r
 *   automatically — regardless of whether it was registered in sync or\r
 *   async logic.\r
 * - Passing \`null\` instead of an instance binds the effect to no\r
 *   component, so it is never auto-cleaned; the caller must manage its\r
 *   lifecycle by calling \`stop()\`.\r
 *\r
 * Trigger timing:\r
 * - Dependencies are collected from reactive values accessed while the\r
 *   callback executes.\r
 * - The concrete trigger timing depends on the API that uses this\r
 *   signature (effect, preEffect, postEffect, or syncEffect).\r
 * - Non-sync variants are scheduled asynchronously; their callbacks run\r
 *   after the current task settles.\r
 *\r
 * Callback:\r
 * - May return a cleanup function that runs before the next execution\r
 *   and when the effect is stopped.\r
 *\r
 * Returned object:\r
 * - \`stop()\` completely stops the effect and releases resources.\r
 * - \`pause()\` temporarily suspends rerunning the effect.\r
 * - \`resume()\` resumes a previously paused effect.\r
 *\r
 * Examples:\r
 * \`\`\`ts\r
 * const handle = effect(instance, () => {\r
 *     // This reruns when reactive values used here change.\r
 *     console.log(\`current count: \${count}\`)\r
 * })\r
 *\r
 * count = 1 // console logs: "current count: 1"\r
 *\r
 * handle.pause()\r
 * count = 2 // effect not rerun\r
 *\r
 * handle.resume()\r
 * count = 3 // console logs: "current count: 3"\r
 *\r
 * handle.stop()\r
 * count = 4 // effect not rerun\r
 *\r
 * // Unbound effect: cleaned up manually.\r
 * const handle = syncEffect(null, () => {\r
 *     // Sync to external services.\r
 *     console.log(\`syncing count: \${count}\`)\r
 * })\r
 *\r
 * handle.stop()\r
 * \`\`\`\r
 *\r
 * @param instance The component instance to bind the effect to, or \`null\` to leave it unbound.\r
 * @param callback Contains side-effect logic and optional cleanup return.\r
 * @returns A control handle with stop, pause, and resume methods.\r
 */
export declare function postEffect(instance: ComponentInstance<any> | null, callback: EffectCallback): EffectHandle\r
\r
// Generated by build-types script
/**\r
 * Registers a watcher for a reactive source and runs callback logic when\r
 * the watched value changes.\r
 *\r
 * Typical use case: react to state transitions with side effects such as\r
 * logging, DOM reads, or resource lifecycle management.\r
 *\r
 * Binding:\r
 * - The first argument is the component instance the watcher binds to.\r
 *   When the component is destroyed, the watcher is cleaned up\r
 *   automatically — regardless of whether it was registered in sync or\r
 *   async logic.\r
 * - Passing \`null\` instead of an instance binds the watcher to no\r
 *   component, so it is never auto-cleaned; the caller must manage its\r
 *   lifecycle by calling \`stop()\`.\r
 *\r
 * Trigger timing:\r
 * - The concrete trigger timing depends on the API that uses this\r
 *   signature (watch, preWatch, postWatch, or syncWatch).\r
 * - Non-sync variants are scheduled asynchronously; their callbacks run\r
 *   after the current task settles.\r
 *\r
 * Callback:\r
 * - Receives the previous value and current value.\r
 * - May return a cleanup function that runs before the next callback\r
 *   execution and when the watcher is stopped.\r
 *\r
 * Returned object:\r
 * - \`stop()\` completely stops the watcher and releases resources.\r
 * - \`pause()\` temporarily suspends invoking the callback.\r
 * - \`resume()\` resumes a previously paused watcher.\r
 *\r
 * Examples:\r
 * \`\`\`ts\r
 * const handle = watch(instance, () => count, (pre, cur) => {\r
 *     // Track transitions for debugging or analytics.\r
 *     console.log(\`count changed from \${pre} to \${cur}\`)\r
 * })\r
 *\r
 * count = 2 // console logs: "count changed from 0 to 2"\r
 *\r
 * handle.pause()\r
 * count = 3 // callback not called\r
 *\r
 * handle.resume()\r
 * count = 4 // console logs: "count changed from 2 to 4"\r
 *\r
 * handle.stop()\r
 * count = 5 // callback not called\r
 *\r
 * // Unbound watcher: cleaned up manually.\r
 * const handle = syncWatch(null, () => query, (pre, cur) => {\r
 *     // React to query changes.\r
 *     console.log(\`query changed from \${pre} to \${cur}\`)\r
 * })\r
 *\r
 * query = "new" // console logs: "query changed from old to new"\r
 * handle.stop()\r
 * \`\`\`\r
 *\r
 * @param instance The component instance to bind the watcher to, or \`null\` to leave it unbound.\r
 * @param getter Returns the value to observe.\r
 * @param callback Handles value changes with \`(pre, cur)\`.\r
 * @returns A control handle with stop, pause, and resume methods.\r
 */
export declare function postWatch<T>(\r
instance: ComponentInstance<any> | null,\r
getter: Getter<T>,\r
callback: WatchCallback<T>\r
): EffectHandle\r
\r
// Generated by build-types script
/**\r
 * Registers a reactive side effect and reruns it when tracked\r
 * dependencies change.\r
 *\r
 * Typical use case: run async requests, logging, or integration logic\r
 * that should respond to reactive state updates.\r
 *\r
 * Binding:\r
 * - The first argument is the component instance the effect binds to.\r
 *   When the component is destroyed, the effect is cleaned up\r
 *   automatically — regardless of whether it was registered in sync or\r
 *   async logic.\r
 * - Passing \`null\` instead of an instance binds the effect to no\r
 *   component, so it is never auto-cleaned; the caller must manage its\r
 *   lifecycle by calling \`stop()\`.\r
 *\r
 * Trigger timing:\r
 * - Dependencies are collected from reactive values accessed while the\r
 *   callback executes.\r
 * - The concrete trigger timing depends on the API that uses this\r
 *   signature (effect, preEffect, postEffect, or syncEffect).\r
 * - Non-sync variants are scheduled asynchronously; their callbacks run\r
 *   after the current task settles.\r
 *\r
 * Callback:\r
 * - May return a cleanup function that runs before the next execution\r
 *   and when the effect is stopped.\r
 *\r
 * Returned object:\r
 * - \`stop()\` completely stops the effect and releases resources.\r
 * - \`pause()\` temporarily suspends rerunning the effect.\r
 * - \`resume()\` resumes a previously paused effect.\r
 *\r
 * Examples:\r
 * \`\`\`ts\r
 * const handle = effect(instance, () => {\r
 *     // This reruns when reactive values used here change.\r
 *     console.log(\`current count: \${count}\`)\r
 * })\r
 *\r
 * count = 1 // console logs: "current count: 1"\r
 *\r
 * handle.pause()\r
 * count = 2 // effect not rerun\r
 *\r
 * handle.resume()\r
 * count = 3 // console logs: "current count: 3"\r
 *\r
 * handle.stop()\r
 * count = 4 // effect not rerun\r
 *\r
 * // Unbound effect: cleaned up manually.\r
 * const handle = syncEffect(null, () => {\r
 *     // Sync to external services.\r
 *     console.log(\`syncing count: \${count}\`)\r
 * })\r
 *\r
 * handle.stop()\r
 * \`\`\`\r
 *\r
 * @param instance The component instance to bind the effect to, or \`null\` to leave it unbound.\r
 * @param callback Contains side-effect logic and optional cleanup return.\r
 * @returns A control handle with stop, pause, and resume methods.\r
 */
export declare function preEffect(instance: ComponentInstance<any> | null, callback: EffectCallback): EffectHandle\r
\r
// Generated by build-types script
/**\r
 * Registers a watcher for a reactive source and runs callback logic when\r
 * the watched value changes.\r
 *\r
 * Typical use case: react to state transitions with side effects such as\r
 * logging, DOM reads, or resource lifecycle management.\r
 *\r
 * Binding:\r
 * - The first argument is the component instance the watcher binds to.\r
 *   When the component is destroyed, the watcher is cleaned up\r
 *   automatically — regardless of whether it was registered in sync or\r
 *   async logic.\r
 * - Passing \`null\` instead of an instance binds the watcher to no\r
 *   component, so it is never auto-cleaned; the caller must manage its\r
 *   lifecycle by calling \`stop()\`.\r
 *\r
 * Trigger timing:\r
 * - The concrete trigger timing depends on the API that uses this\r
 *   signature (watch, preWatch, postWatch, or syncWatch).\r
 * - Non-sync variants are scheduled asynchronously; their callbacks run\r
 *   after the current task settles.\r
 *\r
 * Callback:\r
 * - Receives the previous value and current value.\r
 * - May return a cleanup function that runs before the next callback\r
 *   execution and when the watcher is stopped.\r
 *\r
 * Returned object:\r
 * - \`stop()\` completely stops the watcher and releases resources.\r
 * - \`pause()\` temporarily suspends invoking the callback.\r
 * - \`resume()\` resumes a previously paused watcher.\r
 *\r
 * Examples:\r
 * \`\`\`ts\r
 * const handle = watch(instance, () => count, (pre, cur) => {\r
 *     // Track transitions for debugging or analytics.\r
 *     console.log(\`count changed from \${pre} to \${cur}\`)\r
 * })\r
 *\r
 * count = 2 // console logs: "count changed from 0 to 2"\r
 *\r
 * handle.pause()\r
 * count = 3 // callback not called\r
 *\r
 * handle.resume()\r
 * count = 4 // console logs: "count changed from 2 to 4"\r
 *\r
 * handle.stop()\r
 * count = 5 // callback not called\r
 *\r
 * // Unbound watcher: cleaned up manually.\r
 * const handle = syncWatch(null, () => query, (pre, cur) => {\r
 *     // React to query changes.\r
 *     console.log(\`query changed from \${pre} to \${cur}\`)\r
 * })\r
 *\r
 * query = "new" // console logs: "query changed from old to new"\r
 * handle.stop()\r
 * \`\`\`\r
 *\r
 * @param instance The component instance to bind the watcher to, or \`null\` to leave it unbound.\r
 * @param getter Returns the value to observe.\r
 * @param callback Handles value changes with \`(pre, cur)\`.\r
 * @returns A control handle with stop, pause, and resume methods.\r
 */
export declare function preWatch<T>(\r
instance: ComponentInstance<any> | null,\r
getter: Getter<T>,\r
callback: WatchCallback<T>\r
): EffectHandle\r
\r
declare type ProxyWrapper = BaseWrapper & ProxyWrapperExtra\r
\r
declare interface ProxyWrapperExtra {\r
    s: Map<any, Subscription> | null // sync subscriptions\r
    a: Map<any, Subscription> | null // async subscriptions\r
}\r
\r
declare function pushTrackingStack(tracking?: boolean): void;\r
\r
declare type ReactivityWrapper = ProxyWrapper | AccessorWrapper\r
\r
export declare const resumeTracking: typeof popTrackingStack;\r
\r
export declare const resumeUpdating: typeof decreSchedulingPauseDepth;\r
\r
// Generated by build-types script
/**\r
 * Writes a context value into the contexts layer of the specified\r
 * component instance.\r
 *\r
 * The context contract of the component is honored: \`key\` must be one of\r
 * the context keys declared by the component (see\r
 * {@link ComponentContexts}), and \`value\` must match the corresponding\r
 * declared type. When the component declares no context keys, the call\r
 * degrades to a permissive signature.\r
 *\r
 * The write lands on the instance's own layer, shadowing any same-named\r
 * key inherited from the parent; the parent value is unaffected.\r
 *\r
 * Examples:\r
 * \`\`\`ts\r
 * // Set a static value\r
 * setContext(instance, "theme", "dark")\r
 *\r
 * // Set a reactive value\r
 * let theme = reactive(0)\r
 * setContext(instance, "getCount", () => count)\r
 *\r
 * // Reactive read in a descendant:\r
 * contexts.getCount()\r
 * \`\`\`\r
 *\r
 * @param instance The target component instance\r
 * @param key The context key.\r
 * @param value The context value.\r
 */
export declare function setContext<I extends ComponentInstance<any>, K extends DeclaredContextKeys<I>>(\r
instance: I,\r
key: K,\r
value: K extends never ? never : InstanceContexts<I>[K]\r
): void\r
\r
// Generated by build-types script
/**\r
 * Writes a context value as a getter into the contexts layer of the\r
 * specified component instance.\r
 *\r
 * The context contract of the component is honored: \`key\` must be one of\r
 * the context keys declared by the component (see\r
 * {@link ComponentContexts}), and the getter must return the\r
 * corresponding declared type. When the component declares no context\r
 * keys, the call degrades to a permissive signature.\r
 *\r
 * Unlike \`setContext\`, which stores a static value, \`setContextGetter\`\r
 * stores a getter function. When \`contexts[key]\` is read anywhere in the\r
 * component tree, the getter is **automatically invoked by the framework**\r
 * — the user never calls \`getter()\` manually. This enables:\r
 *\r
 * - **Lazy evaluation**: the getter runs only when the value is actually\r
 *   read.\r
 * - **Reactive tracking**: if the getter accesses reactive state, the\r
 *   framework automatically tracks dependencies and schedules updates when\r
 *   they change.\r
 *\r
 * Use \`setContext\` when the value is static or you want to store a function\r
 * as a plain value (without auto-invocation). Use \`setContextGetter\` when\r
 * the value should be recomputed on each read and/or needs reactive tracking.\r
 *\r
 * Examples:\r
 * \`\`\`ts\r
 * // Set a reactive value as a context getter.\r
 * let count = shallow(0)\r
 * setContextGetter(instance, "count", () => count)\r
 *\r
 * // Reactive read in a descendant:\r
 * contexts.count\r
 * \`\`\`\r
 *\r
 * @param instance The target component instance\r
 * @param key The context key.\r
 * @param getter The getter function that returns the current context value.\r
 */
export declare function setContextGetter<I extends ComponentInstance<any>, K extends DeclaredContextKeys<I>>(\r
instance: I,\r
key: K,\r
getter: K extends never ? never : Getter<InstanceContexts<I>[K]>\r
): void\r
\r
declare type Setter<T = any> = (v: T) => void\r
\r
export declare const startBatchUpdating: typeof increBatchSyncDepth;\r
\r
export declare const stopBatchUpdating: typeof decreBatchSyncDepth;\r
\r
declare interface Subscription {\r
    k: Link[]\r
    l: number // flag\r
    w: ReactivityWrapper\r
    p: any // property of wrapper\r
    a: number // active link index\r
}\r
\r
// Generated by build-types script
/**\r
 * Registers a reactive side effect and reruns it when tracked\r
 * dependencies change.\r
 *\r
 * Typical use case: run async requests, logging, or integration logic\r
 * that should respond to reactive state updates.\r
 *\r
 * Binding:\r
 * - The first argument is the component instance the effect binds to.\r
 *   When the component is destroyed, the effect is cleaned up\r
 *   automatically — regardless of whether it was registered in sync or\r
 *   async logic.\r
 * - Passing \`null\` instead of an instance binds the effect to no\r
 *   component, so it is never auto-cleaned; the caller must manage its\r
 *   lifecycle by calling \`stop()\`.\r
 *\r
 * Trigger timing:\r
 * - Dependencies are collected from reactive values accessed while the\r
 *   callback executes.\r
 * - The concrete trigger timing depends on the API that uses this\r
 *   signature (effect, preEffect, postEffect, or syncEffect).\r
 * - Non-sync variants are scheduled asynchronously; their callbacks run\r
 *   after the current task settles.\r
 *\r
 * Callback:\r
 * - May return a cleanup function that runs before the next execution\r
 *   and when the effect is stopped.\r
 *\r
 * Returned object:\r
 * - \`stop()\` completely stops the effect and releases resources.\r
 * - \`pause()\` temporarily suspends rerunning the effect.\r
 * - \`resume()\` resumes a previously paused effect.\r
 *\r
 * Examples:\r
 * \`\`\`ts\r
 * const handle = effect(instance, () => {\r
 *     // This reruns when reactive values used here change.\r
 *     console.log(\`current count: \${count}\`)\r
 * })\r
 *\r
 * count = 1 // console logs: "current count: 1"\r
 *\r
 * handle.pause()\r
 * count = 2 // effect not rerun\r
 *\r
 * handle.resume()\r
 * count = 3 // console logs: "current count: 3"\r
 *\r
 * handle.stop()\r
 * count = 4 // effect not rerun\r
 *\r
 * // Unbound effect: cleaned up manually.\r
 * const handle = syncEffect(null, () => {\r
 *     // Sync to external services.\r
 *     console.log(\`syncing count: \${count}\`)\r
 * })\r
 *\r
 * handle.stop()\r
 * \`\`\`\r
 *\r
 * @param instance The component instance to bind the effect to, or \`null\` to leave it unbound.\r
 * @param callback Contains side-effect logic and optional cleanup return.\r
 * @returns A control handle with stop, pause, and resume methods.\r
 */
export declare function syncEffect(instance: ComponentInstance<any> | null, callback: EffectCallback): EffectHandle\r
\r
// Generated by build-types script
/**\r
 * Registers a watcher for a reactive source and runs callback logic when\r
 * the watched value changes.\r
 *\r
 * Typical use case: react to state transitions with side effects such as\r
 * logging, DOM reads, or resource lifecycle management.\r
 *\r
 * Binding:\r
 * - The first argument is the component instance the watcher binds to.\r
 *   When the component is destroyed, the watcher is cleaned up\r
 *   automatically — regardless of whether it was registered in sync or\r
 *   async logic.\r
 * - Passing \`null\` instead of an instance binds the watcher to no\r
 *   component, so it is never auto-cleaned; the caller must manage its\r
 *   lifecycle by calling \`stop()\`.\r
 *\r
 * Trigger timing:\r
 * - The concrete trigger timing depends on the API that uses this\r
 *   signature (watch, preWatch, postWatch, or syncWatch).\r
 * - Non-sync variants are scheduled asynchronously; their callbacks run\r
 *   after the current task settles.\r
 *\r
 * Callback:\r
 * - Receives the previous value and current value.\r
 * - May return a cleanup function that runs before the next callback\r
 *   execution and when the watcher is stopped.\r
 *\r
 * Returned object:\r
 * - \`stop()\` completely stops the watcher and releases resources.\r
 * - \`pause()\` temporarily suspends invoking the callback.\r
 * - \`resume()\` resumes a previously paused watcher.\r
 *\r
 * Examples:\r
 * \`\`\`ts\r
 * const handle = watch(instance, () => count, (pre, cur) => {\r
 *     // Track transitions for debugging or analytics.\r
 *     console.log(\`count changed from \${pre} to \${cur}\`)\r
 * })\r
 *\r
 * count = 2 // console logs: "count changed from 0 to 2"\r
 *\r
 * handle.pause()\r
 * count = 3 // callback not called\r
 *\r
 * handle.resume()\r
 * count = 4 // console logs: "count changed from 2 to 4"\r
 *\r
 * handle.stop()\r
 * count = 5 // callback not called\r
 *\r
 * // Unbound watcher: cleaned up manually.\r
 * const handle = syncWatch(null, () => query, (pre, cur) => {\r
 *     // React to query changes.\r
 *     console.log(\`query changed from \${pre} to \${cur}\`)\r
 * })\r
 *\r
 * query = "new" // console logs: "query changed from old to new"\r
 * handle.stop()\r
 * \`\`\`\r
 *\r
 * @param instance The component instance to bind the watcher to, or \`null\` to leave it unbound.\r
 * @param getter Returns the value to observe.\r
 * @param callback Handles value changes with \`(pre, cur)\`.\r
 * @returns A control handle with stop, pause, and resume methods.\r
 */
export declare function syncWatch<T>(\r
instance: ComponentInstance<any> | null,\r
getter: Getter<T>,\r
callback: WatchCallback<T>\r
): EffectHandle\r
\r
// Generated by build-types script
/**\r
 * Returns the underlying raw value from a reactive wrapper.\r
 *\r
 * Typical use case: compare identity with non-reactive data or pass\r
 * plain values to third-party libraries that should not receive proxies.\r
 *\r
 * If the input is not wrapped, this function returns the input as-is.\r
 *\r
 * Examples:\r
 * \`\`\`ts\r
 * const inner = {}\r
 * const outer = reactive({ inner })\r
 *\r
 * // The nested value is wrapped when accessed through a reactive object.\r
 * console.log(outer.inner === inner) // false\r
 *\r
 * // \`toRaw\` restores identity to the original object.\r
 * console.log(toRaw(outer.inner) === inner) // true\r
 * console.log(toRaw(outer).inner === inner) // true\r
 *\r
 * const plain = { name: "Qingkuai" }\r
 * const raw = toRaw(plain)\r
 *\r
 * // Plain values are returned directly.\r
 * console.log(raw === plain) // true\r
 * \`\`\`\r
 *\r
 * @param value A value that may be a Qingkuai reactive proxy.\r
 * @returns The raw target for a proxy, or the original value.\r
 */
export declare function toRaw<T>(value: T): T\r
\r
// Generated by build-types script
/**\r
 * Returns the reactive proxy for a value that was already made reactive.\r
 *\r
 * Typical use case: obtain the reactive proxy of a value when you need\r
 * to work with its tracked properties.\r
 *\r
 * This function does not add new reactive capability; it only retrieves\r
 * an existing proxy. If the value was not inferred or explicitly marked\r
 * as reactive by the compiler, the original value is returned.\r
 *\r
 * Examples:\r
 * \`\`\`ts\r
 * const obj = { count: 0 }\r
 * const shallowReactiveObj = shallow(obj)\r
 *\r
 * // Retrieve the shallow reactive proxy from a raw value.\r
 * const proxy = toReactive(obj)\r
 * console.log(proxy === shallowReactiveObj) // true\r
 *\r
 * // Changes trigger reactivity (shallow level only).\r
 * proxy.count++\r
 *\r
 * const plain = { name: "Qingkuai" }\r
 *\r
 * // If the value has no reactive proxy, return the value as-is.\r
 * const result = toReactive(plain)\r
 * console.log(result === plain) // true\r
 * \`\`\`\r
 *\r
 * @param value The object that may have a reactive proxy.\r
 * @returns The reactive proxy if one exists, otherwise the original\r
 * value.\r
 */
export declare function toReactive<T extends AnyObject>(value: T): T\r
\r
// Generated by build-types script
/**\r
 * Returns the reactive proxy for a value that was already made reactive.\r
 *\r
 * Typical use case: obtain the reactive proxy of a value when you need\r
 * to work with its tracked properties.\r
 *\r
 * This function does not add new reactive capability; it only retrieves\r
 * an existing proxy. If the value was not inferred or explicitly marked\r
 * as reactive by the compiler, the original value is returned.\r
 *\r
 * Examples:\r
 * \`\`\`ts\r
 * const obj = { count: 0 }\r
 * const shallowReactiveObj = shallow(obj)\r
 *\r
 * // Retrieve the shallow reactive proxy from a raw value.\r
 * const proxy = toReactive(obj)\r
 * console.log(proxy === shallowReactiveObj) // true\r
 *\r
 * // Changes trigger reactivity (shallow level only).\r
 * proxy.count++\r
 *\r
 * const plain = { name: "Qingkuai" }\r
 *\r
 * // If the value has no reactive proxy, return the value as-is.\r
 * const result = toReactive(plain)\r
 * console.log(result === plain) // true\r
 * \`\`\`\r
 *\r
 * @param value The object that may have a reactive proxy.\r
 * @returns The reactive proxy if one exists, otherwise the original\r
 * value.\r
 */
export declare function toShallow<T extends AnyObject>(value: T): T\r
\r
export declare const version = "__QK_PACKAGE_VERSION__";\r
\r
// Generated by build-types script
/**\r
 * Registers a watcher for a reactive source and runs callback logic when\r
 * the watched value changes.\r
 *\r
 * Typical use case: react to state transitions with side effects such as\r
 * logging, DOM reads, or resource lifecycle management.\r
 *\r
 * Binding:\r
 * - The first argument is the component instance the watcher binds to.\r
 *   When the component is destroyed, the watcher is cleaned up\r
 *   automatically — regardless of whether it was registered in sync or\r
 *   async logic.\r
 * - Passing \`null\` instead of an instance binds the watcher to no\r
 *   component, so it is never auto-cleaned; the caller must manage its\r
 *   lifecycle by calling \`stop()\`.\r
 *\r
 * Trigger timing:\r
 * - The concrete trigger timing depends on the API that uses this\r
 *   signature (watch, preWatch, postWatch, or syncWatch).\r
 * - Non-sync variants are scheduled asynchronously; their callbacks run\r
 *   after the current task settles.\r
 *\r
 * Callback:\r
 * - Receives the previous value and current value.\r
 * - May return a cleanup function that runs before the next callback\r
 *   execution and when the watcher is stopped.\r
 *\r
 * Returned object:\r
 * - \`stop()\` completely stops the watcher and releases resources.\r
 * - \`pause()\` temporarily suspends invoking the callback.\r
 * - \`resume()\` resumes a previously paused watcher.\r
 *\r
 * Examples:\r
 * \`\`\`ts\r
 * const handle = watch(instance, () => count, (pre, cur) => {\r
 *     // Track transitions for debugging or analytics.\r
 *     console.log(\`count changed from \${pre} to \${cur}\`)\r
 * })\r
 *\r
 * count = 2 // console logs: "count changed from 0 to 2"\r
 *\r
 * handle.pause()\r
 * count = 3 // callback not called\r
 *\r
 * handle.resume()\r
 * count = 4 // console logs: "count changed from 2 to 4"\r
 *\r
 * handle.stop()\r
 * count = 5 // callback not called\r
 *\r
 * // Unbound watcher: cleaned up manually.\r
 * const handle = syncWatch(null, () => query, (pre, cur) => {\r
 *     // React to query changes.\r
 *     console.log(\`query changed from \${pre} to \${cur}\`)\r
 * })\r
 *\r
 * query = "new" // console logs: "query changed from old to new"\r
 * handle.stop()\r
 * \`\`\`\r
 *\r
 * @param instance The component instance to bind the watcher to, or \`null\` to leave it unbound.\r
 * @param getter Returns the value to observe.\r
 * @param callback Handles value changes with \`(pre, cur)\`.\r
 * @returns A control handle with stop, pause, and resume methods.\r
 */
export declare function watch<T>(\r
instance: ComponentInstance<any> | null,\r
getter: Getter<T>,\r
callback: WatchCallback<T>\r
): EffectHandle\r
\r
export declare type WatchCallback<T> = (pre: T, cur: T) => void | GeneralFunc\r
\r
export { }\r
`;export{e as default};