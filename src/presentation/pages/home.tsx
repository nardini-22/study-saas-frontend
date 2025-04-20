"use client";

import { IAuthContract } from "@/domain/auth";
import { Button, ModalLogin, ModalPlans } from "../components";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks";
import { RiFootprintFill, RiVipCrownFill } from "@remixicon/react";

interface Props {
  auth: IAuthContract;
}

export function HomePage({ auth }: Props) {
  const { push } = useRouter();
  const { user } = useAuth();
  const phrases = [
    "Aprender é um hábito. Torne-o visível.",
    "Aprenda todos os dias, evolua sempre.",
    "Transforme cada aprendizado em um marco da sua jornada.",
    "Pequenos aprendizados diários, grandes mudanças ao longo do tempo.",
    "Registre, acompanhe e potencialize seu conhecimento.",
    "Seu progresso, um aprendizado por vez.",
    "Aprender é um hábito. Torne-o visível.",
    "O que você aprendeu hoje? Documente e cresça.",
    "Construa sua trilha de conhecimento, um dia de cada vez",
  ];

  const [displayText, setDisplayText] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number>(0);
  const [typingSpeed, setTypingSpeed] = useState<number>(150);
  const [open, setOpen] = useState<boolean>(false);

  const currentPhrase = phrases[currentPhraseIndex];
  const typingRef = useRef<NodeJS.Timeout | null>(null);

  const handleStartTrail = () => {
    if (user) {
      push("/trails");
      return;
    }
    setOpen(true);
  };

  useEffect(() => {
    const handleTyping = () => {
      const current = currentPhrase.substring(
        0,
        displayText.length + (isDeleting ? -1 : 1)
      );

      setDisplayText(current);

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && current === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && current === "") {
        setIsDeleting(false);
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      }
    };

    if (typingRef.current) clearTimeout(typingRef.current);
    typingRef.current = setTimeout(handleTyping, typingSpeed);

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [displayText, isDeleting, currentPhrase, currentPhraseIndex, typingSpeed]);

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-10">
      <div className="text-5xl uppercase font-tactic-sans leading-[90%] text-center tracking-wider md:text-8xl font-bold text-main text-shadow">
        <h1>
          <span className="animate-colorT">T</span>
          oday
        </h1>
        <h1>
          <span className="animate-colorI">I</span>
          <span className="animate-colorL">L</span>
          earned
        </h1>
      </div>
      <div className="font-bold text-2xl text-center">
        <p className="relative text-lg">
          {displayText || "\u200B"}
          <span className="absolute -ml-[1px] animate-blink">|</span>
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <Button onClick={handleStartTrail} className="h-14 gap-2 flex">
          <RiFootprintFill aria-hidden="true" />
          Comece a trilhar
        </Button>
        <ModalLogin open={open} setOpen={setOpen} auth={auth} />
        <ModalPlans
          trigger={
            <Button className="gap-2 flex" variant="light">
              <RiVipCrownFill className="size-4" aria-hidden="true" /> Planos
            </Button>
          }
        />
      </div>
    </div>
  );
}
