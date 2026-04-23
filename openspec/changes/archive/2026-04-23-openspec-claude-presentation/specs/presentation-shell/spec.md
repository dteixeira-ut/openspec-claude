## ADDED Requirements

### Requirement: Slide navigation
The app SHALL display one slide at a time and allow the user to move forward and backward through the slide deck.

#### Scenario: Advance to next slide via button
- **WHEN** the user clicks the "Next" button
- **THEN** the app displays the next slide in sequence

#### Scenario: Advance to next slide via keyboard
- **WHEN** the user presses ArrowRight or the `l` key
- **THEN** the app displays the next slide in sequence

#### Scenario: Go back to previous slide via button
- **WHEN** the user clicks the "Previous" button
- **THEN** the app displays the previous slide in sequence

#### Scenario: Go back to previous slide via keyboard
- **WHEN** the user presses ArrowLeft or the `h` key
- **THEN** the app displays the previous slide in sequence

#### Scenario: Navigation is bounded
- **WHEN** the user is on the first slide and attempts to go back
- **THEN** the Previous button is disabled and no navigation occurs

#### Scenario: Navigation is bounded at end
- **WHEN** the user is on the last slide and attempts to advance
- **THEN** the Next button is disabled and no navigation occurs

### Requirement: Progress indicator
The app SHALL display the current slide number and total slide count so the user knows their position in the deck.

#### Scenario: Progress indicator reflects current position
- **WHEN** a slide is displayed
- **THEN** the progress indicator shows `<current> / <total>` (e.g., "3 / 12")

### Requirement: Visual design matches UserTesting.com aesthetic
The app SHALL use a visual style consistent with usertesting.com: deep purple primary color, white/light-gray backgrounds, bold sans-serif typography (Inter or equivalent), generous whitespace, and subtle card-style slide containers.

#### Scenario: Primary color is deep purple
- **WHEN** any interactive element (button, progress indicator, active state) is rendered
- **THEN** it uses the deep purple primary color (`#6B3FA0` or equivalent from the design token)

#### Scenario: Typography is clean and sans-serif
- **WHEN** any text is rendered
- **THEN** it uses Inter or a comparable geometric sans-serif at legible sizes

#### Scenario: Slides render in a card container
- **WHEN** a slide is displayed
- **THEN** it is rendered inside a white or light-gray card with subtle box-shadow, centered on a slightly darker background

### Requirement: Responsive layout
The app SHALL be usable on both desktop (1280px+) and tablet (768px+) viewports.

#### Scenario: Desktop layout fills available width
- **WHEN** viewed on a 1280px or wider viewport
- **THEN** the slide card uses a comfortable max-width with centered horizontal alignment

#### Scenario: Tablet layout adapts without overflow
- **WHEN** viewed on a 768px wide viewport
- **THEN** all text and navigation controls remain visible without horizontal scrolling

### Requirement: Accessible keyboard and ARIA
The slide region SHALL be accessible to screen readers and keyboard-only users.

#### Scenario: Slide region has accessible role
- **WHEN** a slide is rendered
- **THEN** the slide container has `role="region"` and `aria-label` describing the current slide title

#### Scenario: Navigation buttons have accessible labels
- **WHEN** Previous or Next buttons are rendered
- **THEN** each has an `aria-label` and is focusable via Tab
