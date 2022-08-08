---
title: javascript
layout: default.liquid
---

- It is recommended that /* */ comments be avoided and // comments be used instead.

- Values can be retrieved from an object by wrapping a string expression in a [ ] suffix. If the string expression is a constant, and if it is a legal JavaScript name and not a reserved word, then the . notation can be used instead. The . notation is preferred because it is more compact and it reads better

- When you write something inside ${} in a template literal, its result will be computed, converted to a string, and included at that position.

- A fragment of code that produces a value is called an expression.
- If you ask for the value of an empty binding, you’ll get the value undefined.
- Function declarations are not part of the regular top-to-bottom flow of control. They are conceptually moved to the top of their scope and can
be used by all the code in that scope.
- JavaScript is extremely broad-minded about the number of arguments youpass to a function. If you pass too many, the extra ones are ignored. If you
pass too few, the missing parameters get assigned the value undefined.

- Values of type string, number, and Boolean are not objects, and though the language doesn’t complain if you try to set new properties on them, it
doesn’t actually store those properties. As mentioned earlier, such values are immutable and cannot be changed
