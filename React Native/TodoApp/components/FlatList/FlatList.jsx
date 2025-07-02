import { View, Text, FlatList } from 'react-native'
import Box from './Box'

const FlatListCom = () => {
    const COLORS = [
        { colorName: 'Base03', hexCode: '#002b36' },
        { colorName: 'Base02', hexCode: '#073642' },
        { colorName: 'Base01', hexCode: '#586e75' },
        { colorName: 'Base00', hexCode: '#657b83' },
        { colorName: 'Base0', hexCode: '#839496' },
        { colorName: 'Base1', hexCode: '#93a1a1' },
        { colorName: 'Base2', hexCode: '#eee8d5' },
        { colorName: 'Base3', hexCode: '#fdf6e3' },
        { colorName: 'Yellow', hexCode: '#b58900' },
        { colorName: 'Orange', hexCode: '#cb4b16' },
        { colorName: 'Red', hexCode: '#dc322f' },
        { colorName: 'Magenta', hexCode: '#d33682' },
        { colorName: 'Cyan', hexCode: '#2aa198' },
        { colorName: 'Green', hexCode: '#859900' },
        { colorName: 'Base03', hexCode: '#002b37' },
        { colorName: 'Base02', hexCode: '#073643' },
        { colorName: 'Base01', hexCode: '#586e76' },
        { colorName: 'Base00', hexCode: '#657b84' },
        { colorName: 'Base0', hexCode: '#839497' },
        { colorName: 'Base1', hexCode: '#93a1a2' },
        { colorName: 'Base2', hexCode: '#eee8d6' },
        { colorName: 'Base3', hexCode: '#fdf6e4' },
        { colorName: 'Yellow', hexCode: '#b58901' },
        { colorName: 'Orange', hexCode: '#cb4b17' },
        { colorName: 'Red', hexCode: '#dc3221' },
        { colorName: 'Magenta', hexCode: '#d33683' },
        { colorName: 'Cyan', hexCode: '#2aa199' },
        { colorName: 'Green', hexCode: '#859901' },
    ]
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={COLORS}
                renderItem={({ item }) => <Box {...item} />}
                ListEmptyComponent={<Text>No Data</Text>}
                ItemSeparatorComponent={() => (<View style={{ alignItems: 'center' }}>
                    <View style={{ height: 8, backgroundColor: "black", width: "80%", borderRadius: 8 }}></View>
                </View>)}
            ></FlatList>
        </View>
    )
}

export default FlatListCom