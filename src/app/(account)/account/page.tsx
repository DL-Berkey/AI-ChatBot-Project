import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import FindIdTabCard from "@/components/account/FindIdTabCard";
import ChangePasswordTabcard from "@/components/account/ChangePasswordTabcard";

const page = () => {
    return (
        <Tabs defaultValue="id" className="mx-auto w-96 mt-28 shadow-main">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="id">아이디 찾기</TabsTrigger>
                <TabsTrigger value="password">비밀번호 변경</TabsTrigger>
            </TabsList>
            <TabsContent value="id">
                <FindIdTabCard />
            </TabsContent>
            <TabsContent value="password">
                <ChangePasswordTabcard />
            </TabsContent>
        </Tabs>
    );
};

export default page;
