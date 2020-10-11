import React, { Component } from 'react';
import {graphql} from 'react-apollo'
import {getBooksQuery} from "./../queries/queries"
import BookDetails from './BookDetails';
import bookCover from "./../images/book-cover.jpg"

class BookList extends Component{
    constructor(props){
        super(props);
        this.state = {
            selected:null
        }
    }
    displayBooks(){
        let data = this.props.data
        
        if(data.loading){
            return (<div>Loading books...</div>)
        }else{
            return data.books.map(book=>{
                return(
                    <div 
                
                    style={{
                        textAlign:"center",
                        padding:"26px",
                        
                    }}
                    >
                    <img src={bookCover}
                    style={{
                        width:"200px",
                        height:"200px"
                    }}
                    />
                    <li key={book.id} onClick={(e)=>{this.setState({selected:book.id})}}
                    style={{
                        position:"absolute",
                        left:"24%",
                    }}
                    >{book.name}</li>
                    </div>
                )
            })
        }
    }
    render(){
        return(
            <div>
              <ul id="book-list">
                {this.displayBooks()}
              </ul>
              <BookDetails bookId={this.state.selected} />
            </div>
        )
    }
}

export default graphql(getBooksQuery)(BookList);
