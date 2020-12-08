import React, { Component } from 'react';
import graphQLFetch from './graphQLFetch';

class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: ''
        };

        this.change = this.change.bind(this);
    }

    async comment(comm) {
        const form = document.forms.createComment
        const comment = {
            userId: 1,
            postID: form.postID.value,
            content: comm
        };
        const query = `mutation commentCreate(
            $comment: CommentInputs
        ){
          commentCreate(
            comment: $comment
          ){
              id
              content
              author{
                  firstname
                  username
                  lastname
              }
              post{
                  source
                  description
                  createAt
                  userId
			  }
		  }
        }`
        const data = await graphQLFetch(query, { comment });
    }
        
    change(e) {
        this.setState({
            comment: e.target.value
        });
    }

    render() {
        return (
            <div className="commentview">
                {this.props.comments.map((comment, key) => {

                    {
                        for (let i = 0; i < this.props.users.length; i++) {
                            if (this.props.users[i].id === comment.user_id) {
                                return (
                                    <div>
                                        {this.props.users[i].username}: {comment.comm}
                                    </div>
                                )
                            }
                        }
                    }

                })}
                <form>
                    <input type="text" onChange={this.change}></input>
                </form>
                <button onClick={() => { this.comment(this.state.comment) }}>Comment</button>
            </div>
        );
    }
}

export default Comment;