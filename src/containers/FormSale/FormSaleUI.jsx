import React from 'react';
import { Add } from '@mui/icons-material';
import { IconButton, MenuItem, Select } from '@mui/material';
import { Form } from '../../components/Form';
import { Section } from '../../components/Section';
import { Stats } from '../Stats';
import { ProductsTable } from '../../components/TableComponents';
import { Modal } from '../../components/Modal';

function FormSaleUI({
  salesmans,
  clients,
  products,
  loading,
  openModal,
  setOpenModal,
  newProduct,
  setNewProduct,
  cart,
  handleAddProduct,
  handleDeleteProduct,
  sale,
  setSale,
}) {
  return (
    <Section>
      {!loading && (
        <>
          <Stats
            firstStat={{ name: 'Monto', value: 69 }}
            secondStat={{ name: 'Nro de productos', value: 420 }}
            thirdStat={{ name: 'Nro de factura', value: 1 }}
          />
          <Form title="Registro de venta">
            <Select
              labelId="select-id"
              value={sale.salesman}
              onChange={event => {
                setSale({ ...sale, salesman: event.target.value });
              }}
              label="Vendedor"
            >
              {salesmans.results.map(salesman => (
                <MenuItem value={salesman.id} key={salesman.id}>
                  {salesman.name}
                </MenuItem>
              ))}
            </Select>

            <Select
              label="Cliente"
              value={sale.client}
              onChange={event => {
                setSale({ ...sale, client: event.target.value });
              }}
            >
              {clients.results.map(client => (
                <MenuItem value={client.id} key={client.id}>
                  {client.name}
                </MenuItem>
              ))}
            </Select>
          </Form>

          <ProductsTable
            head={['Nombre', 'Precio', 'Tax', 'Cantidad', 'Eliminar', 'Editar']}
            body={cart}
            editable
            handleDeleteProduct={handleDeleteProduct}
          />
          <IconButton
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <Add />
          </IconButton>

          {openModal && (
            <Modal>
              <Form
                title="Agregar producto"
                handleSubmit={handleAddProduct}
                handleCancel={() => {
                  setOpenModal(false);
                }}
              >
                <Select
                  labelId="select-id"
                  value={newProduct.id}
                  onChange={event => {
                    setNewProduct({
                      ...products.results[event.target.value],
                      quantity: newProduct.quantity,
                    });
                  }}
                  defaultValue={1}
                >
                  {products.results.map(product => (
                    <MenuItem value={product.id} key={product.id}>
                      {product.name}
                    </MenuItem>
                  ))}
                </Select>

                <Select
                  labelId="select-id"
                  value={newProduct.quantity}
                  onChange={event => {
                    setNewProduct({
                      ...newProduct,
                      quantity: event.target.value,
                    });
                  }}
                  defaultValue={0}
                >
                  {Array.from(Array(101).keys()).map(number => (
                    <MenuItem value={number} key={number}>
                      {number}
                    </MenuItem>
                  ))}
                </Select>
              </Form>
            </Modal>
          )}
        </>
      )}
    </Section>
  );
}

export { FormSaleUI };
