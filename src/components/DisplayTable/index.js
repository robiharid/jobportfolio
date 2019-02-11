import React, { Component } from 'react';
import { Table, IconButton } from 'evergreen-ui';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import { Button } from 'evergreen-ui';
class DisplayTable extends Component {
  state = {
    loading: false,
    companies: [],
    limit: 10,
    searchQuery: '',
  };

  handleFilterChange = value => {
    this.setState({ searchQuery: value });
  };

  componentDidMount() {
    this.onListenForCompanies();
  }

  onListenForCompanies = () => {
    this.setState({ loading: true });
    this.unsubscribe = this.props.firebase
      .userCompanies(this.props.authUser.uid)
      .orderBy('createdAt', 'desc')
      .limit(this.state.limit)
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          let companies = [];
          snapshot.forEach(doc =>
            companies.push({ ...doc.data(), uid: doc.id }),
          );

          this.setState({
            companies: companies.reverse(),
            loading: false,
          });
        } else {
          this.setState({ companies: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForCompanies,
    );
  };

  render() {
    const { users } = this.props;
    const { companies, loading } = this.state;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {!loading && companies && (
              <Button appearance="primary" onClick={this.onNextPage}>
                More
              </Button>
            )}

            {loading && <div>Loading ...</div>}

            {companies && (
              <Table>
                <Table.SearchHeaderCell
                  onChange={this.handleFilterChange}
                  value={this.state.searchQuery}
                />
                <Table.Head>
                  {/* <Table.TextHeaderCell>Logo</Table.TextHeaderCell> */}
                  <Table.TextHeaderCell>Name</Table.TextHeaderCell>
                  <Table.TextHeaderCell>Email</Table.TextHeaderCell>
                  <Table.TextHeaderCell>Salary</Table.TextHeaderCell>
                  <Table.TextHeaderCell>
                    Deadline
                  </Table.TextHeaderCell>
                  <Table.TextHeaderCell>
                    Location
                  </Table.TextHeaderCell>
                  <Table.TextHeaderCell>ID</Table.TextHeaderCell>
                </Table.Head>
                <Table.Body height={480}>
                  {companies.map(company => {
                    return (
                      <Table.Row
                        key={company.id}
                        isSelectable
                        onSelect={() => alert(company.name)}
                      >
                        {/* <Table.TextCell>{profile.logo}</Table.TextCell> */}
                        <Table.TextCell>
                          {company.name}
                        </Table.TextCell>
                        <Table.TextCell>
                          {company.email}
                        </Table.TextCell>
                        <Table.TextCell>
                          {company.salary}
                        </Table.TextCell>
                        <Table.TextCell>
                          {company.deadline}
                        </Table.TextCell>
                        <Table.TextCell>
                          {company.location}
                        </Table.TextCell>
                        <Table.TextCell>{company.id}</Table.TextCell>
                        <Table.Cell width={25} flex="none">
                          <IconButton
                            icon="edit"
                            color="info"
                            height={24}
                            appearance="minimal"
                          />
                        </Table.Cell>
                        <Table.Cell width={25} flex="none">
                          <IconButton
                            icon="ban-circle"
                            color="danger"
                            height={24}
                            appearance="minimal"
                          />
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            )}

            {!companies && <div>There are no companies</div>}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(DisplayTable);
