import React, { Component } from 'react';

import {
  Container,
  Content,
  Header,
  Body,
  Title,
  Form,
  Item,
  Input,
  Icon,
  Spinner,
  Button,
  Text,
  Right
} from 'native-base'

import RepoList from './RepoList';

export default class App extends Component<{}> {

  state = {
    search: '',
    repositories: [],
    loading: false
  };

  fetchRepositories = async () => {
    if(this.state.search.length > 0){

      this.setState({ loading: true });

      const response = await fetch(`https://api.github.com/search/repositories?q=${this.state.search}`);
      const repositories = await response.json();

      this.setState({
        repositories: repositories.items,
        loading: false
      });
    }
  };

  render() {
    return (
      <Container>
        <Header
          // androidStatusBarColor="#04aa8d"
          // style={{ backgroundColor:"#00AA8D" }}
        >
          <Body>
            <Title>Github Explorer</Title>
          </Body>
        </Header>
        <Content padder>
          <Form>
            <Item last>
            <Icon active name='search' />
              <Input
                placeholder="Digite aqui..."
                value={this.state.search}
                onChangeText={text => this.setState({ search: text})}
               />
               <Button transparent
                  onPress={() => this.setState({ search: '' ,repositories: []}) }
               >
                 <Text>Clear </Text>
               </Button>
            </Item>
          </Form>
          <Button
            block
            style={{ marginTop: 10 }}
            onPress={ this.fetchRepositories }
          >
          <Text>Buscar</Text>
          </Button>
          {
            this.state.loading ? <Spinner color="blue"/>
            : <RepoList repositories={this.state.repositories}/>
          }
        </Content>
      </Container>
    );
  }
}
