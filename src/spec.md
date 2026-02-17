# Specification

## Summary
**Goal:** Add a Creations/Templates gallery to the creator dashboard to browse built-in templates and published user projects, and support publishing projects.

**Planned changes:**
- Add a new left-sidebar item labeled “Creations/Templates” that opens a dedicated gallery view within the existing dashboard layout (right panel on desktop, bottom sheet on mobile/tablet).
- Implement the gallery UI with two separated lists (e.g., tabs): “Templates” (built-in starter templates) and “Creations” (published user projects), including loading and empty states.
- Add backend APIs to list built-in templates and create a new user project from a selected template.
- Add backend support and APIs for per-project publish/unpublish, plus an API to list published projects for the gallery; restrict publish-state changes to the owner (or admin).
- Update backend persistence/migration so existing saved projects safely gain the new publish/shared field defaulting to not published.
- Add React Query hooks for listing templates, listing published creations, and publish/unpublish mutations, including cache invalidation/refetch and user-friendly error messaging.

**User-visible outcome:** Users can open “Creations/Templates” to browse templates and published creations, create a new project from a template, and publish/unpublish their projects so published ones appear in the Creations list.
