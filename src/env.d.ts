/// <reference path="../.astro/actions.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    user:
      | {
          name: string | null
          email: string | null
        }
      | undefined
  }
}
