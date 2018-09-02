### Installation

```sh
npm i --save "git+https://github.com/AleksandrNikolaevich/react-native-app-notification.git"
```


### example



#### index.tsx
    
    import React from 'react';
    import {Component} from 'react';
    import AppNavigator from './navigators/AppNavigator';
    import { NotifiacationProvider }from 'react-native-app-notification';<-- Here
    
    type Props = {};
    export default class App extends Component<Props> {
        render() {
            return (
                <NotifiacationProvider>{/*<-- Here*/}
                    <AppNavigator />
                </NotifiacationProvider>
            );
        }
    }

#### component.tsx
    import React from "react";
    import {View, Text, Button} from "react-native";
    import { withNotify, WithNotify } from "react-native-app-notification";<-- Here
    
    type Props = WithNotify & {};
    
    class Signin extends React.PureComponent<Props, {}>{
        render(){
    
            const {notify} = this.props
    
            return(
                <View style={{flex:1}}>
                    <Text>Test notify</Text>
                    <Button title="test alert" onPress={()=>{
                        notify({
                            message: "Hello world"
                        })
                    }}/>
                </View>
            )
        }
    }
    
    export default withNotify(Signin);<-- Here


### Props (NotifiacationProvider)

| Name | Required |defaultValue |
| ------ | ------ | ------ |
| colors | No | colors: { info: '#4671ff', success: '#0cd8ab', error: '#ff426b', warn: 'rgb(255, 193, 7)' } |

### NotifyParams

| Name | Required | Example | Default|
| ------ | ------ | ------ | ------ |
| message | Yes | "Hello world" |
| timeout | No | 5000 | 3000 (3 second) |
| type | No | AlertTypes.warn | AlertTypes.info |
| onPress | No | ()=>{} |  |

License
----

MIT



