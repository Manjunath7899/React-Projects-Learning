import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";

interface AccordionProp {
  id: number;
  title: string;
  content: string;
}

export const Accordion: React.FC = () => {
  const { data, loading, error } = useFetch<AccordionProp[]>(
    "http://localhost:3000/accordion"
  );

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleMultiSelect = (id: number) => {
    setSelectedIds((prevState) => {
      return prevState.includes(id)
        ? prevState.filter((itemId) => itemId !== id)
        : [...prevState, id];
    });
  };

  console.log(selectedIds);

  if (error) {
    return (
      <div>
        <h1>Error: {error}</h1>
      </div>
    );
  } else if (loading) {
    return (
      <div>
        <h1>...Loading</h1>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {data &&
        data.length > 0 &&
        data.map((item) => {
          return (
            <div key={item.id}>
              <div
                style={styles.content}
                onClick={() => handleMultiSelect(item.id)}
              >
                <h3>{item.title}</h3>

                {selectedIds.includes(item.id) ? (
                  <ArrowDropUpOutlinedIcon style={styles.arrowIcon} />
                ) : (
                  <ArrowDropDownOutlinedIcon style={styles.arrowIcon} />
                )}
              </div>

              {selectedIds.includes(item.id) && (
                <div style={styles.content}>
                  <h3>{item.content}</h3>
                </div>
              )}
              <hr />
            </div>
          );
        })}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    margin: "0 auto",
    width: 500,
    height: 500,
    overflowY: "scroll",
  },
  content: {
    display: "flex",
    gap: 20,
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
  },
  arrowIcon: {
    marginTop: 10,
    width: 50,
    height: 40,
    cursor: "pointer",
  },
  buttonMultiSelect: {
    marginTop: "50%",
    marginBottom: 30,
    backgroundColor: "ornage",
    padding: 10,
  },
};
