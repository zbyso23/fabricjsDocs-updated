import { AppSearchContext } from "./AppSearchContext";
const { useEffect, useState, useCallback, useContext, useMemo, useRef } = React;
const log = console.log;

export const SearchForm = ({
  phrase,
  onChangePhrase,
  file,
  onChangeFile,
  section,
  onChangeSection,
  searchInName,
  onChangeSearchInName,
  searchInDesc,
  onChangeSearchInDesc,
  searchCaseSensitive,
  onChangeSearchCaseSensitive
}) => {
  const { result, files } = useContext(AppSearchContext);
  const ref = useRef();
  log(`:: files`, files);
  const sections = useMemo(() => {
    const sections = [];
    result.list.forEach(({ section }) => {
      if (sections.includes(section)) return;
      sections.push(section);
    });
    log(`:: useMemo`, sections);
    return sections;
  }, [result.list]);

  log(`:: sections`, sections);

  return (
    <div class="flex">
      <input name="search" ref={ref} value={phrase} onChange={onChangePhrase} />
      <select onChange={onChangeFile}>
        <option value={-1} selected={file === -1}>
          all files
        </option>
        {files.map((filename, index) => {
          return (
            <option value={index.toString()} selected={file === index}>
              {filename}
            </option>
          );
        })}
      </select>
      <select onChange={onChangeSection}>
        <option value="" selected={section === ""}>
          all sections
        </option>
        {sections.map((sectionItem) => (
          <option value={sectionItem} selected={section === sectionItem}>
            {sectionItem}
          </option>
        ))}
      </select>
      <input
        type="checkbox"
        checked={searchInName}
        id="search-name"
        onChange={onChangeSearchInName}
      />
      <label for="search-name">Name</label>
      <input
        type="checkbox"
        checked={searchInDesc}
        id="search-desc"
        onChange={onChangeSearchInDesc}
      />
      <label for="search-desc">Description</label>
      <input
        type="checkbox"
        checked={searchCaseSensitive}
        id="search-case-sensitive"
        onChange={onChangeSearchCaseSensitive}
      />
      <label for="search-case-sensitive">Case sensitive</label>
    </div>
  );
};
// class Hello extends React.Component {
//     render() {
//       return <div>Hello React!</div>;
//     }
//   }
//   export default Hello;
