import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadFriends, deleteFriend } from '../../redux/reducers/friendReducer';
// import {addUserLocation} from '../redux/reducers/userLocationReducer';
import { List, ListItem } from 'material-ui/List';
import SimpleMap from '../SimpleMap';

// Material UI
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import Delete from 'material-ui/svg-icons/action/delete-forever';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  marginRight: 10,
  marginTop: 10,
};

const ListStyle = {
   margin: 0,
   height: '100px'
}

class friendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
      open: false
    }

    this.onDeleteYes = this.onDeleteYes.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.renderLocation = function(friend){
      //console.log("friend inside render function", friend.user);
      if (friend.user.userlocations.length > 0 && friend.user.userlocations[0].name)
      {
        return (<primaryText>At {friend.user.userlocations[0].name} </primaryText>);
      }
      else
      {
        return (<primaryText> lat: {friend.user.lat} long: {friend.user.long} </primaryText>);
      }
    };
  }

  onDeleteYes(){
    console.log('delete yes clicked: ', this.state.selected)
    ;
    const groupId=this.state.selected.groupId;
    const userId=this.state.selected.user.id;
    this.setState({open: false});
    this.props.deleteFriend(groupId, userId, this.state);
    
  }

  onClick(fn, evt){
    //zoom the person
    fn(evt.user.lat, evt.user.long);
    this.setState({selected: evt})
    const lat = this.state.selected.user.lat;
    const lang = this.state.selected.user.lang;
   // console.log('onClick -  zoom', this.state.selected.user.lat)
  
  }

  onClickTrash(){
    //console.log('transhCan: ', this.state.gId,this.state.fId)
    console.log('trashCan!!', 'group', this.state.selected.groupId, 'friend', this.state.selected.id)
  }

  handleOpen(evt){
    this.setState({open: true});
    //this.setState({selected: evt});
    console.log('delete button',this.state.selected)
  };

  handleClose(){
    this.setState({open: false});
  };


  render() {
      
    const {friends, lat, lng, changeValue } = this.props;
      if(!friends) return null;
    // console.log(friends[0].user);
    // console.log('I am printing friend zero dot user',friends[0].user.userlocations[0].name)
    //console.log('SimpleMap', lat, lng);
    // console.log('friends[0]', friends[0].user.photo)
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.onDeleteYes}
      />,
    ];
    return (
       <div >
          <List >
           
            {
              friends.map(friend => {
                return (<ListItem 
                   style={ListStyle}                 
                  onClick = {()=>this.onClick(changeValue, friend)}
                  value={friend.id}
                  leftAvatar={<Avatar src={friend.user.photo} />}
                  key={friend.id}
                  rightIconButton={
                  <div>
                  <IconButton onClick={this.handleOpen} style={style}><Delete /></IconButton>
                      <Dialog
                        title="Delete Friend"
                        actions={actions}
                        modal={true}
                        open={this.state.open}
                      >
                       Are you sure to delete {friend.user.name}?
                      </Dialog></div>}

                  
                  primaryText={ 
                    <div value={friend.id}>
                      <span style={{ color: darkBlack }} value={friend.id} key={friend.id}>{friend.user.name
                      } </span></div>
                 
                  }
                  secondaryText=
                  {
                   <primaryText> {this.renderLocation(friend)} </primaryText>
                  }
                  secondaryTextLines={2}
          
                />);
              })
            }
          </List>
        </div>
    )
  }

}


const mapDispatchToProps = (dispatch) => (
  {
    loadFriends: (gId) => dispatch(loadFriends(gId)),
    deleteFriend: (gId, fId) => dispatch(deleteFriend(gId, fId))
  }
);

const mapStateToProps = (state) => (
  {
    friends: state.friends,
    user: state.user
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(friendList);


