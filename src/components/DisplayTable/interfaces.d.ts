interface IProps {
  
}

interface IState { 
  userCompanies: {
    name: string,
    email: string,
    salary: number,
    deadline: string,
    location: string,
    id: string
  }[],
  errorMessage: string
}