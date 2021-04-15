import React, { useState } from "react";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import {v4} from "uuid";
function App() {
  const [item, setItem] = useState("")
  const [state, setState] = useState({
    todo: {
      title: "Todo",
      items: [],
    },
    "in-progress": {
      title: "In Progress",
      items: [],
    },
    done: {
      title: "Completed",
      items: [],
    },
  });

  const addItem = () => {
    setState(prev => {
      return {
        ...prev,
        todo: {
          title: "Todo",
          items: [
            {
              id: v4(),
              name: item
            },
            ...prev.todo.items
          ]
        }
      }
    })

    setItem("")
  }
  return (
    <>
      <h1 style={{textAlign:"center"}}>Drag and Drop ToDo List</h1>
      <div style={{textAlign:"center"}}>
        <input type="text" value={item} onChange={(e) => setItem(e.target.value)}/>
        <button onClick={addItem}>Add</button>
      </div>
      <div className="App">
      
        <DragDropContext onDragEnd={(e) => console.log(e)}>
          {_.map(state, (data, key) => {
            return (
              <div className={"column"}>
                <h3>{data.title}</h3>
                <Droppable droppableId={key}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={"droppable-col"}
                      >
                        {data.items.map((el, index) => {
                          return (
                            <Draggable
                              key={el.id}
                              index={index}
                              draggableId={el.id}
                            >
                              {(provided, snapshot) => {
                                console.log(snapshot);
                                return (
                                  <div
                                    className={`item ${
                                      snapshot.isDragging && "dragging"
                                    }`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    {el.name}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
}

export default App;
