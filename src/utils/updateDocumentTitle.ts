export const updateTitlePrefix = (titlePrefix: string) => {
  document.title = `${titlePrefix && `${titlePrefix} - `}${
    import.meta.env.VITE_APP_NAME
  }`;
};
