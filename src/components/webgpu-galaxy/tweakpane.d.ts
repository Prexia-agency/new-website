/**
 * Type augmentation for Tweakpane v4
 * Adds missing method signatures that exist in runtime but not in types
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
      on(event: string, handler: () => void): void;
    };
    addButton(params: { title: string }): {
      on(event: string, handler: () => void): void;
    };
    refresh(): void;
  }
}
