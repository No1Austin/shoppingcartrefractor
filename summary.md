# Refactoring Summary Report

## Iteration v0 → v1 (Cleanup)
- Renamed unclear variables (c → cart, add → addItem, rm → removeItem).
- Extracted repeated logic into helper functions (finding items).
- Reduced duplication and improved readability.
- Kept behavior the same and ensured the program stayed runnable.

## Iteration v1 → v2 (Strategy Pattern)
- Introduced a Discount Strategy system to remove hard-coded discount logic.
- ShoppingCart no longer needs to know how discounts work; it simply calls strategy.apply(total).
- Added multiple strategies (NoDiscount, VIP 20%, PercentageDiscount) without changing ShoppingCart logic.

## Iteration v2 → v3 (Observer Pattern)
- Added a notifier system to decouple “price change” from “who gets notified”.
- When a product price drops, observers (subscribers) are notified automatically.
- This improves extensibility (add email/SMS/logging later with no changes to catalog logic).

## Iteration v3 → v4 (Builder Pattern)
- Added ProductBuilder for flexible creation of complex Product objects.
- Reduced constructor complexity and made product creation more readable.
- Builder supports optional fields (tags, metadata) cleanly.

## Clean Code Principles Followed
- Meaningful names
- Single responsibility per class/function
- Reduced duplication (DRY)
- Separation of concerns and loose coupling
- Small iterative changes with tests after each step

## Why Patterns Improved Design
- Strategy: easy to add new discounts safely
- Observer: easy to add notification systems without tight coupling
- Builder: clean creation of complex objects without messy constructors