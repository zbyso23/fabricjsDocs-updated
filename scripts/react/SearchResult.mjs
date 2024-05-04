import { AppSearchContext } from "./AppSearchContext";
const { useEffect, useState, useCallback, useContext, useMemo, useRef } = React;
const log = console.log;

export const SearchResult = () => {
  const { result, files, file, setFile, section, setSection } =
    useContext(AppSearchContext);

  const searchResult = useMemo(() => {
    return result.list.filter(({ section: sectionItem, file: fileItem }) => {
      if (file !== -1 && fileItem !== file) return false;
      if (section !== "" && sectionItem !== section) return false;
      return true;
    })
  }, [result.list, section, file]);

  return (
    <div class="flex flex-column search-result">
      {searchResult.map(({ section, name, hash, desc, file: fileItem }) => {
        return (
          <article class="flex-row">
            <div class="header">
              <h4><a href={`http://localhost:8000/${files[fileItem]}${hash}`} target="_blank">{name}</a></h4>
            </div>
            <div class="section">
              <h5>{section}</h5>
              <h6>{files[fileItem]}</h6>
            </div>
            <div class="desc">
              {desc}
            </div>
          </article>
        )
      })}
    </div>
  )
}