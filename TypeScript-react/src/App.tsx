
import Card from './components/Card'
import Counter from './components/Counter'
import List from './components/list'
import OrderForm from './components/OrderForm';

const items = [
  { name: 'Item 1', price: 10, isSpecial: true },
  { name: 'Item 2', price: 20 },
  { name: 'Item 3', price: 30, isSpecial: true },
];

const App = () => {
  return (
    <div>
      <List items={items} />
      <div>
        <Counter />
      </div>
      <OrderForm onSubmit={(data) => alert(JSON.stringify(data))} />
    </div>
  )
}

export default App