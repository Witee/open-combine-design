const base = `

\`\`\`js
import { PopoverInput } from 'open-combine-design';

class App extends React.Component {
  state = { value: '' };

  handleSubmit = (value) => {
    console.log('handleSubmit: ', value);
    this.setState({ value });
  };

  render(){
    return(
      <PopoverInput
        title="请输入名称"
        inputLabelName="名称"
        cardStyle={{ width: '20em' }}
        submit={this.handleSubmit}
        btnStyle={{ width: '10em', margin: '5em' }}
        btnType="primary"
        btnIcon="file"
      />
    )
  }
}

ReactDOM.render(<App />, mountNode);
\`\`\`
`;

export default {
  base,
};
