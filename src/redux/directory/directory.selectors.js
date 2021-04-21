import { createSelector } from 'reselect';

const selectSections = state => state.directory;

export const selectDirectorySections = createSelector(
    [selectSections],
    directory => directory.sections
)

