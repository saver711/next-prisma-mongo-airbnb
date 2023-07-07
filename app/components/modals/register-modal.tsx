"use client"
import { useRegisterModal } from "@/app/hooks/use-register-modal"
import axios from "axios"
import { useState } from "react"
import { useForm, FieldValues, SubmitHandler } from "react-hook-form"
import { shallow } from "zustand/shallow"
import { Modal } from "./modal"
import { Heading } from "../heading"
import { toast } from "react-hot-toast"
import { Input } from "../inputs/input"
import { Button } from "../button"
import { FcGoogle } from "react-icons/fc"
import { AiFillGithub } from "react-icons/ai"
import { User } from "@prisma/client"
import { signIn, useSession } from "next-auth/react"
import { useLoginModal } from "@/app/hooks/use-login-modal"
export const RegisterModal = () => {
  const isModalOpen = useRegisterModal((state) => state.isOpen)

  const { onClose, onOpen } = useRegisterModal(
    (state) => ({ onClose: state.onClose, onOpen: state.onOpen }),
    shallow
  )

  const loginModalOnOpen = useLoginModal((state) => state.onOpen)

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios
      .post("/api/register", data)
      .then(({ data: comingData }: { data: User }) => {
        toast.success(`Registered successfully, Welcome ${comingData.name}`)
        signIn("credentials", {
          email: data.email,
          password: data.password
        })
        onClose()
      })
      .catch((err) => {
        console.log(`RegisterModal ~ err:`, err)
        toast.error("Something went wrong.")
      })
      .finally(() => setIsLoading(false))
  }

  const onToggle = () => {
    onClose()
    loginModalOnOpen()
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb!" subtitle="Create an account" />
      <Input
        errors={errors}
        id="email"
        type="email"
        label="Email"
        disabled={isLoading}
        register={register}
        required
      />
      <Input
        errors={errors}
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        required
      />
      <Input
        errors={errors}
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>
          Already have an account?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {" "}
            Log in
          </span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={isModalOpen}
      title="Register"
      actionLabel="Continue"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
