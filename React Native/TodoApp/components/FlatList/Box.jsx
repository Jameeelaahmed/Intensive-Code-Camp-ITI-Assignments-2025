import { View, Text } from 'react-native'

const Box = ({ colorName, hexCode }) => {
    return (
        <View style={{ padding: 30, backgroundColor: hexCode }}>
            <Text style={{ textAlign: 'center' }}>{colorName} {hexCode}</Text>
        </View>
    )
}

export default Box