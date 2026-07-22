## Summary

<!-- What does this PR change and why? Link the task issue with "Closes #". -->

Closes #

## Persona

<!-- swe / designer / product-owner / devops-sre -->

## Verification

- [ ] Ran inside a container (`docker compose run --rm -w /home/app app npm run validate` or equivalent)
- [ ] Each new/changed test asserts a behavior observable in `prototype/Landing Page.dc.html` (cite section)
- [ ] Every new component has a story (and a test, if it has behavior)
- [ ] No hardcoded data literals in components (all content flows through `lib/content`)
- [ ] No hardcoded palette colors outside `styles/tokens.css`
- [ ] Screenshots reviewed against the prototype (if this PR touches visual output) — reviewer comment below

## PR size

<!-- Target: 3-7 files, 200-350 changed lines. Note any exemption (lockfile, binary assets) here. -->
