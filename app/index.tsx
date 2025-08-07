import { images, offers } from "@/constants";
import { FlatList, Image, Pressable, Text, View } from 'react-native';

import cn from 'clsx';
import { SafeAreaView } from "react-native-safe-area-context";
import "./globals.css";
 
export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList data={offers} renderItem={({item,index})=>{
        const isEven:boolean=index%2===0;

        return(
        <View>
            <Pressable 
            className={cn('offer-card',isEven?'flex-row-reverse':'flex-row')} 
            style={{backgroundColor:item.color}}>
              
              {({pressed})=>(
                <>
                <View className={"h-full w-1/2"}>
                  <Image source={item.image} className={"size-full"} resizeMode={"contain"}/>
                </View>

                <View className={cn("offer-card__info",isEven?'pl-10':'pr-10')}>
                  <Text className="h1-bold text-white leading-tight">{item.title}</Text>
                  <Image source={images.arrowRight} className="size-10" resizeMode="contain" tintColor="#ffffff"/>
                </View>


                </>
              )}
            </Pressable>
        </View>)
}}
  contentContainerClassName="pb-28 px-5"
/>

    </SafeAreaView>
  );
}