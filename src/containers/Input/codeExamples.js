const base = `

\`\`\`js
import { Input } from 'open-combine-design';

class App extends React.Component {
  render(){
    return(
      <Input  />
    )
  }
}

ReactDOM.render(<App />, mountNode);
\`\`\`
`;

const customRegular = `

\`\`\`js
import { Input } from 'open-combine-design';

class App extends React.Component {
  render(){
    return(
      <Input
        regular={/^\\d+$/}
        help="只能输入数字"
      />
    )
  }
}

ReactDOM.render(<App />, mountNode);
\`\`\`
`;

const withLabel = `

\`\`\`js
import { Input } from 'open-combine-design';

class App extends React.Component {
  render(){
    return(
      <Input
        labelName="名称"
      />
    )
  }
}

ReactDOM.render(<App />, mountNode);
\`\`\`
`;

export default {
  base,
  customRegular,
  withLabel,
};
