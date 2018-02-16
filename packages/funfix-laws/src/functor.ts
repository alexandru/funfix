/*
 * Copyright (c) 2017-2018 by The Funfix Project Developers.
 * Some rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { HK, Functor } from "funfix-types"
import { Equiv } from "./equiv"

/**
 * Type-class laws for `Functor`, as defined in the `funfix-types`
 * sub-project and in the `static-land` spec.
 *
 * Laws defined for `Functor`:
 *
 * 1. Identity: `F.map(fa, x => x) <-> fa`
 * 2. Composition: `F.map(fa, x => f(g(x))) <-> F.map(F.map(fa, g), f)`
 */
export class FunctorLaws<F> {
  constructor(public readonly F: Functor<F>) {}

  identity<A>(fa: HK<F, A>): Equiv<HK<F, A>> {
    return Equiv.of(this.F.map(fa, x => x), fa)
  }

  composition<A, B, C>(fa: HK<F, A>, f: (a: B) => C, g: (a: A) => B) {
    const F = this.F
    return Equiv.of(F.map(fa, x => f(g(x))), F.map(F.map(fa, g), f))
  }
}
