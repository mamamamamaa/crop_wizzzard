import {
  User,
  ModalBody,
  ModalContent,
  ModalFooter,
  Spinner,
  CardFooter,
  Badge,
} from "@nextui-org/react";
import { Button as ModalButton } from "@nextui-org/button";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { FormProvider } from "react-hook-form";

import emptyCanvas from "@/public/empty_canvas.jpeg";
import {
  useCreateOrUpdateShapeAPI,
  useDeleteShapeAPI,
  useGetShapesAPI,
} from "@/hooks";
import { TextField } from "@/components";
import { useShapeContext } from "@/providers";

type Props = {
  session: Session;
};

export const AuthorizedModalContent = ({ session }: Props) => {
  const { username, email, avatar } = session.user;
  const { shapes, getShapes, loading } = useGetShapesAPI();
  const {
    createOrUpdateShapeAPI,
    createNewAndUpdateOldShapeAPI,
    methods,
    visible,
    setVisible,
    disabledBtn,
  } = useCreateOrUpdateShapeAPI();
  const { deleteShape } = useDeleteShapeAPI();
  const { activeShape, setActiveShape, setShapes } = useShapeContext();

  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalBody>
            <div className="flex flex-row justify-between items-center">
              <User
                name={username}
                description={email}
                avatarProps={{
                  src: avatar,
                }}
              />
              <ModalButton onClick={() => signOut()}>Sign Out</ModalButton>
            </div>

            {!loading ? (
              <div>
                <p className="text-2xl text-center pb-3">
                  Save(s): {shapes?.length || 0}
                </p>

                <div className="flex gap-3 items-center justify-center flex-wrap overflow-y-scroll max-h-[600px]">
                  {shapes.map((shape) => (
                    <Badge
                      key={shape.id}
                      content=" "
                      className={`${activeShape?.id !== shape.id ? "invisible" : ""}`}
                      color="primary"
                    >
                      <Card className="py-4 bg-gray-800 w-72">
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                          <p className="text-default-500">
                            Created:{" "}
                            {new Date(shape.createdAt).toLocaleDateString()} —{" "}
                            {new Date(shape.createdAt).toLocaleTimeString()}
                          </p>
                          <p className="text-default-500">
                            Updated:{" "}
                            {new Date(shape.updatedAt).toLocaleDateString()} —{" "}
                            {new Date(shape.updatedAt).toLocaleTimeString()}
                          </p>
                          <h4 className="w-60 font-bold text-large text-white whitespace-nowrap overflow-hidden overflow-ellipsis block">
                            {shape.title}
                          </h4>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2">
                          <Image
                            alt="Card background"
                            className="object-cover rounded-xl bg-gray-900"
                            src={shape.image || emptyCanvas.src}
                            style={{
                              objectFit: "contain",
                              width: "100%",
                              height: 270,
                            }}
                          />
                        </CardBody>
                        <CardFooter className="gap-3">
                          <ModalButton
                            className="w-full"
                            color="danger"
                            onClick={() => deleteShape(shape.id, getShapes)}
                          >
                            Delete
                          </ModalButton>
                          <ModalButton
                            className="w-full"
                            color="success"
                            onClick={() => {
                              setActiveShape(shape);
                              setShapes(shape.shapeConfig);
                            }}
                          >
                            Set Active
                          </ModalButton>
                        </CardFooter>
                      </Card>
                    </Badge>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-40 flex items-center justify-center">
                <Spinner size="lg" />
              </div>
            )}
          </ModalBody>
          <ModalFooter className="justify-center flex-col">
            {visible && (
              <FormProvider {...methods}>
                <TextField
                  name="title"
                  label="Title"
                  placeholder="Enter a title"
                  defaultValue=""
                />
              </FormProvider>
            )}
            <div className="flex justify-center flex-row gap-3">
              <ModalButton
                className="w-full"
                disabled={disabledBtn}
                onClick={() =>
                  !methods.getValues("title")
                    ? setVisible(true)
                    : createOrUpdateShapeAPI({ refetchCallback: getShapes })
                }
              >
                Save Active Draw
              </ModalButton>
              <ModalButton
                className="w-full"
                disabled={disabledBtn}
                color="primary"
                onClick={() =>
                  !methods.getValues("title")
                    ? setVisible(true)
                    : createNewAndUpdateOldShapeAPI({
                        refetchCallback: getShapes,
                      })
                }
              >
                Create New Draw and Save Active
              </ModalButton>
            </div>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  );
};
