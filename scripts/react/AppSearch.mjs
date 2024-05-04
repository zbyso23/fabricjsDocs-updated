import { SearchForm } from "./SearchForm";
import { AppSearchContext } from "./AppSearchContext";
import { SearchResult } from "./SearchResult.mjs";

const { useEffect, useState, useCallback, useRef } = React;
const log = console.log;
const warn = console.warn;

const AppSearch = () => {
  const [phrase, setPhrase] = useState("");
  const [file, setFile] = useState(-1);
  const [section, setSection] = useState("");
  const [searchInName, setSearchInName] = useState(true);
  const [searchInDesc, setSearchInDesc] = useState(false);
  const [searchCaseSensitive, setSearchCaseSensitive] = useState(false);

  const [files, setFiles] = useState([]);
  const [list, setList] = useState([]);
  const [result, setResult] = useState({ files: [], list: [] });
  const ref = useRef();

  const onKey = useCallback((event) => {
    return;
    log(`::`, event);
    const { code } = event;
    switch (code) {
      case "KeyE": {
        //
        break;
      }
    }
  }, []);

  const onChangePhrase = useCallback(
    (event) => {
      setPhrase(event.target.value);
    },
    [setPhrase]
  );

  const onChangeFile = useCallback(
    (event) => {
      const fileIndex = event.target.value;
      setFile(parseInt(fileIndex));
    },
    [setFile]
  );

  const onChangeSection = useCallback(
    (event) => {
      setSection(event.target.value);
    },
    [setSection]
  );

  const onChangeSearchInName = useCallback(
    (event) => {
      setSearchInName(event.target.checked);
    },
    [setSearchInName]
  );

  const onChangeSearchInDesc = useCallback(
    (event) => {
      setSearchInDesc(event.target.checked);
    },
    [setSearchInDesc]
  );

  const onChangeSearchCaseSensitive = useCallback(
    (event) => {
      setSearchCaseSensitive(event.target.checked);
    },
    [setSearchCaseSensitive]
  );

  useEffect(() => {
    const resultList = [];
    const resultFiles = [];
    if (!phrase) {
      warn(`:: onSearch - empty phrase`);
      return;
    }
    const phraseLower = !searchCaseSensitive ? phrase.toLowerCase() : phrase;
    list.forEach(({ section: sectionItem, name, desc, file: fileItem }, index) => {
      if (file !== -1 && file !== fileItem) return;
      if (section !== '' && section !== sectionItem) return;
      if (
        (name && searchInName && (!searchCaseSensitive ? name.toLowerCase() : name).indexOf(phraseLower) !== -1) ||
        (desc && searchInDesc && (!searchCaseSensitive ? desc.toLowerCase() : desc).indexOf(phraseLower) !== -1)
      ) {
        resultList.push(list[index]);
        if (!resultFiles.includes(file)) resultFiles.push(file);
      }
    });
    const result = {
      list: resultList,
      files: resultFiles.map((index) => ({ filename: files[index], index })),
    };
    setResult(result);

  }, [list, phrase, section, file, setResult, searchInName, searchInDesc, searchCaseSensitive]);

  useEffect(async () => {
    try {
      const res = await fetch(`data/all.json`);
      const data = await res.json();
      log(`:: res`, data);
      const { files, props } = data;
      setFiles(files);
      setList(props);
    } catch (error) {
      setFiles([]);
      setList([]);
    }
  }, [setList, setFiles]);

  useEffect(() => {
    document.addEventListener("keyup", onKey);
    return () => {
      document.removeEventListener("keyup", onKey);
    };
  }, [onKey]);

  return (
    <AppSearchContext.Provider
      value={{
        result,
        files,
        file,
        setFile,
        section,
        setSection,
      }}
    >
      <button ref={ref}>Edit</button>
      <SearchForm
        phrase={phrase}
        onChangePhrase={onChangePhrase}
        file={file}
        onChangeFile={onChangeFile}
        section={section}
        onChangeSection={onChangeSection}
        searchInName={searchInName}
        onChangeSearchInName={onChangeSearchInName}
        searchInDesc={searchInDesc}
        onChangeSearchInDesc={onChangeSearchInDesc}
        searchCaseSensitive={searchCaseSensitive}
        onChangeSearchCaseSensitive={onChangeSearchCaseSensitive}
      />
      <SearchResult />
    </AppSearchContext.Provider>
  );
};

// class MyComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     // Initialize state if needed
//     this.state = {
//       // your state properties here
//     };
//   }

//   // Define your component’s render method
//   render() {
//     return <Hello />;
//   }
// }

// Render your component to the root element
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<AppSearch />);
