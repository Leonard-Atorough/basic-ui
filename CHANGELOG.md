# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]
### Added
- Added `@testing-library/user-event` dependency for improved user interaction testing.
- Added this changelog file to track changes in the project.
- Added `Assistant.agent.md` file for documenting the assistant agent's capabilities and usage.

### Changed
- Updated pagination icons to use `Icon` component with `ChevronLeftIcon` and `ChevronRightIcon`.
- Refactored pagination logic to use `calculatePaginationState` utility function for cleaner code and better separation of concerns.
- Updated `usePagination` hook to return a more structured pagination state, including page numbers and navigation states.
- Improved responsive handling in `Icon` component by integrating `useResponsive` hook for dynamic styling based on breakpoints.
- Updated documentation to reflect new pagination logic and responsive icon handling.
- Cleaned up imports and re-exports in hooks and lib for better maintainability and clearer code structure.

### Fixed
- Fixed pagination state calculation to correctly handle edge cases when total pages are less than the maximum visible pages.
- Resolved issues with responsive icon sizing by ensuring proper use of `useResponsive` hook in the `Icon` component.

## [0.1.0] - 2024-06-01
### Added
- Initial release of `@basic-ui/core` package with foundational files and configuration for a React component library, including setup for TypeScript, testing, and build processes.