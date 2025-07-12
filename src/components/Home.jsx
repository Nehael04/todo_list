import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

const ItemAdd = () => {
  const [items, setItems] = useState([]); // items list
  const [inputValue, setInputValue] = useState(''); // input string item
  const [editIndex, setEditIndex] = useState(null);  // edited input item
  const [editValue, setEditValue] = useState('');  // storing the edited item
 

  useEffect(() => {  
    setItems(['Task 1', 'Task 2', 'Task 3']);
  }, []);

  const handleAdd = () => {  //add task button
    if (inputValue) { 
      setItems([...items, inputValue]);
      setInputValue('');
    }
  };

  const handleDelete = (index) => {  //delete button
  setItems(items.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {  // edit button
    setEditIndex(index);
    setEditValue(items[index]);
  };

  const handleSave = () => {   // save button
    const updatedItems = [...items];
    updatedItems[editIndex] = editValue;
    setItems(updatedItems);
    setEditIndex(null);
    setEditValue('');
  };


  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4 fw-semibold">ToDo List</h2>
      <Row className="mb-3">

        <Col md={9}>

            <Form.Control type="text"  placeholder="Enter task"  value={inputValue} onChange={(e) => setInputValue(e.target.value)}
             className="bg-light"  style={{outline: '2px solid lightgrey'}}
                 onKeyDown={(event) => {
                                if (event.code === "Enter") {
                                    handleAdd();
                                }}} />
        </Col>

        <Col md={3}>
          <Button variant="outline-primary"  onClick={handleAdd} className="w-100">
            Add Task
          </Button>
        </Col>

      </Row>

      <Table striped hover responsive>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>
                {editIndex === index ? (
                  <Form.Control type="text" value={editValue}  onChange={(e) => setEditValue(e.target.value)}  
                    onKeyDown={(event) => {
                        if (event.code === "Enter") {
                        handleSave();
                        }
                    }}
                  
                  />
                ) : (
                  item
                )}

              </td>
              <td style={{ width: '200px' }}>
                {editIndex === index ? (
                  <>
                    <Button variant="outline-success" size="md" onClick={handleSave}>
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline-warning" size="md" className="me-4" onClick={() => handleEdit(index)}>
                      Edit
                    </Button>
                    <Button variant="outline-danger" size="md" onClick={() => handleDelete(index)}>
                      Delete
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ItemAdd;