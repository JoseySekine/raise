import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NewCards.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";

const grammars = [
  "Grammar",
  "てください",
  "てもいい",
  "てはいけない",
  "なければいけない",
  "なくてもいい",
];

const levels = [
  { value: "", name: "Select Level" },
  { value: "N5", name: "N5" },
  { value: "N4", name: "N4" },
  { value: "N3", name: "N3" },
  { value: "N2", name: "N2" },
  { value: "N1", name: "N1" },
];

const booklist = [
  { value: "", name: "Book Resource" },
  { value: "genki1", name: "Genki 1" },
  { value: "genki2", name: "Genki 2" },
  { value: "tobira", name: "とびら" },
  { value: "minnaNoNihongo", name: "みんなの日本語1" },
  { value: "jlptN5_N4", name: "JLPT Books N5 - N4" },
  { value: "jlptN2", name: "JLPT Books N2" },
  { value: "jlptN3", name: "JLPT Books N3" },
  { value: "jlptN1", name: "JLPT Books N1" },
];

const CardElement: any = (props: {
  num: number;
  onChange: (e: any) => void;
  sentence: string;
  meaning: string;
  grammar: string;
  level: string;
  book: string;
}) => {
  return (
    <div className={styles.new_cards_input}>
      <h3>{props.num}</h3>
      <textarea
        onChange={props.onChange}
        value={props.sentence}
        name="sentence"
        placeholder="Sentence you want to add"
      ></textarea>
      <textarea
        onChange={props.onChange}
        value={props.meaning}
        name="meaning"
        placeholder="Meaning"
      ></textarea>
      <select onSelect={props.onChange} name="grammar">
        {grammars.map((grammar, index) => {
          return (
            <option key={index} value={grammar}>
              {grammar}
            </option>
          );
        })}
      </select>
      <select onSelect={props.onChange} name="level">
        {levels.map((level, index) => {
          return (
            <option key={index} value={level.value}>
              {level.name}
            </option>
          );
        })}
      </select>

      <select onSelect={props.onChange} name="book">
        {booklist.map((book, index) => {
          return (
            <option key={index} value={book.value}>
              {book.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const New_cards = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState([
    { sentence: "", meaning: "", level: "", grammar: "", book: "" },
  ]);

  const addInput = () => {
    setInputs([
      ...inputs,
      { sentence: "", meaning: "", level: "", grammar: "", book: "" },
    ]);
  };

  const handleChange = (e: any, index: number) => {
    const { name, value } = e.target;
    const newInputs: any = [...inputs];
    newInputs[index][name] = value;
    setInputs(newInputs);
  };

  const handleSubmitCards = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(inputs);
    navigate(`/cards_modification?data=${JSON.stringify(inputs)}`);
  };

  return (
    <div className={styles.new_card_container}>
      <h2>Create new cards</h2>
      <form onSubmit={handleSubmitCards} className={styles.new_cards_form}>
        {inputs.map((input, index) => (
          <CardElement
            key={index}
            num={index + 1}
            onChange={(e: any) => handleChange(e, index)}
            sentence={input.sentence}
            meaning={input.meaning}
            level={input.level}
            grammar={input.grammar}
            book={input.book}
          />
        ))}
        <button type="submit" className="black_button">
          Complete
        </button>
      </form>
      <button className={styles.add_plus_button} onClick={addInput}>
        <AiOutlinePlusCircle />
      </button>
    </div>
  );
};

export default New_cards;
