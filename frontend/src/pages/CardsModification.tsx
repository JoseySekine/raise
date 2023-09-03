
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./CardsModification.module.css";

const color = [
  "#FFDAB9",
  "#ADFF2F",
  "#FFB6C1",
  "#E6E6FA",
  "#E0FFFF",
  "#AFEEEE",
  "#FAEBD7",
  "#40E0D0",
];

function Cards_Modification() {
  const sentenceRef = useRef(null);
  const [colorIndex, setColorIndex] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(-1);
  const [matchNow, setMatchNow] = useState(false);
  const [matching, setMatching] = useState<
    { index: number | null; main: string; translation: string }[]
  >([{ index: null, main: "", translation: "" }]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dataString = queryParams.get("data");
  const dataArray = JSON.parse(dataString || "[]");

  const changeHtmlColor = (
    selection: any,
    selectedText: string,
    index: number,
    main: string
  ) => {
    // selected card is matching the editable index
    const range = selection?.getRangeAt(0);
    const span = document.createElement("span");
    span.style.backgroundColor = color[colorIndex];
    span.textContent = selectedText;
    // insert new span html element and change the color
    range?.deleteContents();
    range?.insertNode(span);
    if (main === "main") {
      matching[matching.length - 1].main = selectedText;
      matching[matching.length - 1].index = index;
      setMatching(matching);
      setMatchNow(true);
    } else if(main === 'translation') {
      matching[matching.length - 1].translation = selectedText;
      setMatching((prevMatching) => {
        return [...prevMatching, { index: null, main: "", translation: "" }];
      });
      setMatchNow(false);
      setActiveCardIndex(-1);
      setColorIndex(colorIndex + 1 === color.length ? 0 : colorIndex + 1);
    }

    // Clear the selection
    selection?.removeAllRanges();
  };

  const handleMouseUp = (event: any, index: number) => {
    // waiting for translation to be set
    const { localName } = event.target;

    // check if it's upper line or lower line
    if (localName === "h2") {
      // upper and lower has selected one by one
      if (!matchNow) {
        // get selected line
        let selection = document.getSelection();
        const selectedText = selection?.toString();
        if (selectedText) {
          // new select sentences
          if (activeCardIndex === -1) {
            setActiveCardIndex(index);
          }
          changeHtmlColor(selection, selectedText, index, "main");
        }
      }
    } else if (localName === "h4") {
      if (matchNow) {
        if (activeCardIndex === -1) {
          setActiveCardIndex(index);
        }

        if (activeCardIndex === index) {
          if (matching[matching.length - 1].index === index) {
            let selection = document.getSelection();
            const selectedText = selection?.toString();

            if (selectedText) {
              changeHtmlColor(selection, selectedText, index, "translation");
            }
          }
        }
      }
    }

    console.log(matching);
  };

  return (
    <div className={styles.cards_modification_container}>
      <h4>Partial translations</h4>
      <div className={styles.cards_container}>
        {dataArray.map((item: any, index: number) => {
          return (
            <div className={styles.modify_sentence} key={index}>
              <h2
                key="main"
                ref={sentenceRef}
                onMouseUp={(event) => handleMouseUp(event, index)}
              >
                {item.sentence}
              </h2>
              <h4
                key="translation"
                onMouseUp={(event) => handleMouseUp(event, index)}
              >
                {item.meaning}
              </h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cards_Modification;
