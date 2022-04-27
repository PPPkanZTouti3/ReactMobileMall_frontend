import React,{Component} from 'react'
export default function handleChange(Comp){
    class WrapperComp extends Component{
        constructor(props){
            super(props);
            this.state={}
            this.handleChange=this.handleChange.bind(this)
        }
        //受控组件
        handleChange(key,val){
            this.setState({
                [key]:val
            })
        }
        render(){
            return (
                <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>    
            )
        }
    }
    return WrapperComp
}