/**
 * Type augmentation for Tweakpane v4.
 *
 * The runtime Pane API includes methods that are missing from the published types.
 * We augment them here so TypeScript doesn't block `next build`.
 */
import "tweakpane";

declare module "tweakpane" {
  interface Pane {
    addFolder(params: { title: string; expanded?: boolean }): Pane;

    addBinding<T extends object, K extends keyof T>(
      object: T,
      key: K,
      options?: Record<string, unknown>,
    ): {
      on(event: string, handler: () => void): unknown;
    };

    addButton(params: { title: string }): {
      on(event: string, handler: () => void): unknown;
    };

    refresh(): void;
  }
}
