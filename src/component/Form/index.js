import "./index.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, FloatingLabel, Button, Table } from "react-bootstrap";

const ComponentForm = () => {
  const [data, setData] = useState([]);

  const [productAdd, SetProductAdd] = useState("");
  const [descAdd, SetDescAdd] = useState("");
  const [imageAdd, SetImageAdd] = useState("");
  const [priceAdd, SetPriceAdd] = useState(0);

  const getData = async () => {
    await axios({
      method: "get",
      url: "http://localhost:7777/product",
    })
      .then(function (response) {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  const handleGenerateData = () => {
    console.log("clicked");
    axios({
      method: "post",
      url: "http://localhost:7777/product",
      data: {
        name: productAdd,
        description: descAdd,
        image: imageAdd,
        price: priceAdd,
      },
    }).then(function () {
      SetProductAdd("");
      SetDescAdd("");
      SetImageAdd("");
      SetPriceAdd(0);
      getData();
    });
  };

  const handleEdit = (id) => {
    console.log("edit id: " + id);
    axios({
      method: "put",
      url: "http://localhost:7777/product/" + id,
      data: {
        name: "Test Edit",
        description: "descEdit",
        image:
          "https://ps.w.org/tiny-compress-images/assets/icon-256x256.png?rev=1088385",
        price: 20000,
      },
    }).then(function () {
      getData();
    });
  };

  const handleDelete = (id) => {
    console.log("delete id: " + id);
    axios({
      method: "post",
      url: "http://localhost:7777/product/delete/" + id,
    }).then(function () {
      getData();
    });
  };

  useEffect(() => {
    getData();
    // taroh dataGenerated di dalam array di bawah sini
  }, []);
  return (
    <Container className=" d-flex justify-content-center">
      <div className="row d-flex justify-content-center">
        <div className="d-flex justify-content-center form-container">
          <Form className="form">
            <h1
              className="text-center mb-4"
              style={{ fontWeight: "600", fontFamily: "monospace" }}
            >
              Product
            </h1>
            <FloatingLabel label="Product Name" className="mb-3">
              <Form.Control
                type="text"
                value={productAdd}
                onChange={(e) => SetProductAdd(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel label="Product Description" className="mb-3">
              <Form.Control
                as="textarea"
                style={{ height: "7rem", overflow: "hidden" }}
                value={descAdd}
                onChange={(e) => SetDescAdd(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel label="Image URL" className="mb-3 ">
              <Form.Control
                type="text"
                value={imageAdd}
                onChange={(e) => SetImageAdd(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel label="Rp." className="mb-3">
              <Form.Control
                type="number"
                value={priceAdd}
                onChange={(e) => SetPriceAdd(e.target.valueAsNumber)}
              />
            </FloatingLabel>
            <div className="d-flex justify-content-center mt-4">
              <Button
                style={{
                  width: "10rem",
                  fontWeight: "600",
                  fontSize: "1.1rem",
                }}
                variant="primary"
                onClick={handleGenerateData}
              >
                Add Product
              </Button>
            </div>
          </Form>
        </div>
        <div>
          <h1
            className="text-center mb-4"
            style={{ fontWeight: "600", fontFamily: "monospace" }}
          >
            Table Of Products
          </h1>
          <Table striped bordered hover>
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th className="col-3">Product Name</th>
                <th className="col-4">Product Description</th>
                <th>Image Url</th>
                <th className="col-1">Price</th>
                <th>Created At</th>
                <th className="col-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.image}</td>
                    <td>Rp. {item.price}</td>
                    <td>{item.create_at}</td>
                    <td style={{ width: "12rem" }}>
                      <Button
                        className="mx-3 my-2 btn btn-sm"
                        variant="success"
                        onClick={() => handleEdit(item.id)}
                      >
                        Edit
                      </Button>

                      <Button
                        className=" my-2 btn btn-sm"
                        variant="danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default ComponentForm;
