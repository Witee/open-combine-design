const loadingCode = `

\`\`\`js
import { Placeholder } from 'open-combine-design';

class App extends React.Component {
  render(){
    return(
      <Placeholder
        icon="loading"
        text="加载中..."
        style={{ height: '20em' }}
      />
    )
  }
};
ReactDOM.render(<App />, mountNode);
\`\`\`
`;

const emptyCode = `

\`\`\`js
import { Placeholder } from 'open-combine-design';

class App extends React.Component {
  render(){
    return(
      <Placeholder
        icon="frown-o"
        text="加载中..."
        style={{ height: '20em' }}
      />
    )
  }
};
ReactDOM.render(<App />, mountNode);
\`\`\`
`;

export default {
  loadingCode,
  emptyCode,
};
