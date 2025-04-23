"use client";

import {
  RiFootprintFill,
  RiGlobalFill,
  RiGroupFill,
  RiSignpostLine,
  RiUserLine,
} from "@remixicon/react";
import { AnimatedBeam, BentoCard, BentoGrid, Card, Globe, Marquee } from "./ui";
import { forwardRef, useRef } from "react";
import { cn } from "@/lib";

const trails = [
  {
    color: "bg-primary-500",
    title: "Fundamentos da Programação",
    content:
      "Aprenda lógica, algoritmos e estruturas básicas para começar a programar.",
  },
  {
    color: "bg-secondary-500",
    title: "Desenvolvimento Web",
    content: "Explore HTML, CSS e JavaScript para criar sites modernos.",
  },
  {
    color: "bg-primary-500",
    title: "Back-end com Node.js",
    content: "Construa APIs robustas com Node.js, Express e bancos de dados.",
  },
  {
    color: "bg-secondary-500",
    title: "Front-end com React",
    content: "Desenvolva interfaces dinâmicas e interativas com React.",
  },
  {
    color: "bg-primary-500",
    title: "Banco de Dados",
    content: "Domine SQL, NoSQL e boas práticas de modelagem de dados.",
  },
  {
    color: "bg-secondary-500",
    title: "Mobile com React Native",
    content: "Crie apps nativos para Android e iOS com JavaScript.",
  },
  {
    color: "bg-primary-500",
    title: "DevOps e Deploy",
    content: "Automatize, integre e publique aplicações com CI/CD e cloud.",
  },
  {
    color: "bg-secondary-500",
    title: "Segurança da Informação",
    content: "Entenda como proteger sistemas e dados contra ameaças digitais.",
  },
  {
    color: "bg-primary-500",
    title: "Testes e Qualidade",
    content: "Aprenda a escrever testes e garantir a qualidade do código.",
  },
  {
    color: "bg-secondary-500",
    title: "Inteligência Artificial",
    content: "Introdução a IA, machine learning e redes neurais.",
  },
];

export function BentoGridHome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
  >(({ className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "z-10 flex size-12 items-center justify-center rounded-full bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
          className
        )}
      >
        {children}
      </div>
    );
  });
  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-2xl font-semibold text-center lg:text-left">
        O que nós ofeceremos.
      </h2>
      <BentoGrid className="lg:grid-cols-2 grid-cols-1">
        <BentoCard
          Icon={RiFootprintFill}
          name="Trilhas"
          description="Organize seus diferentes conhecimentos por meio de trilhas."
          background={
            <div className="absolute flex w-full flex-col items-center justify-center">
              <Marquee
                reverse
                className="top-0 [--duration:150s] overflow-hidden"
              >
                {trails.map((trail) => (
                  <Card
                    key={trail.content}
                    withBorder
                    className={
                      "select-none relative flex-col p-0 gap-0 transform-gpu blur-[1px] transition-all duration-300 ease-out"
                    }
                  >
                    <div className="p-4 w-full flex gap-2">
                      <div className={`w-1 shrink-0 rounded ${trail.color}`} />
                      <h2 className="text-2xl font-semibold">{trail.title}</h2>
                    </div>
                    <div className="p-4">
                      <p>{trail.content}</p>
                    </div>
                  </Card>
                ))}
              </Marquee>
              <Marquee className="top-45 [--duration:150s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]">
                {trails.map((trail) => (
                  <Card
                    key={trail.content}
                    withBorder
                    className={
                      "select-none relative flex-col p-0 gap-0 transform-gpu blur-[3px] transition-all duration-300 ease-out"
                    }
                  >
                    <div className="p-4 w-full flex gap-2">
                      <div className={"w-1 shrink-0 rounded bg-primary-500"} />
                      <h2 className="text-2xl font-semibold">{trail.title}</h2>
                    </div>
                    <div className="p-4">
                      <p>{trail.content}</p>
                    </div>
                  </Card>
                ))}
              </Marquee>
            </div>
          }
          className="col-span-1"
        />
        <BentoCard
          Icon={RiGroupFill}
          name="Grupos"
          description="Tudo entre amigos é melhor, compartilhe seus conhecimentos nas nossas trilhas em grupo."
          background={
            <div
              className="absolute flex w-full items-center justify-center overflow-hidden p-10 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]"
              ref={containerRef}
            >
              <div className="flex size-full max-h-[200px] max-w-lg flex-col items-stretch justify-between gap-10 ">
                <div className="flex flex-row items-center justify-between">
                  <Circle ref={div1Ref}>
                    <RiUserLine aria-hidden="true" />
                  </Circle>
                  <Circle ref={div5Ref}>
                    <RiUserLine aria-hidden="true" />
                  </Circle>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <Circle ref={div2Ref}>
                    <RiUserLine aria-hidden="true" />
                  </Circle>
                  <Circle ref={div4Ref} className="size-16">
                    <RiSignpostLine aria-hidden="true" />
                  </Circle>
                  <Circle ref={div6Ref}>
                    <RiUserLine aria-hidden="true" />
                  </Circle>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <Circle ref={div3Ref}>
                    <RiUserLine aria-hidden="true" />
                  </Circle>
                  <Circle ref={div7Ref}>
                    <RiUserLine aria-hidden="true" />
                  </Circle>
                </div>
              </div>

              <AnimatedBeam
                containerRef={containerRef}
                fromRef={div1Ref}
                toRef={div4Ref}
                curvature={-75}
                endYOffset={-10}
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={div2Ref}
                toRef={div4Ref}
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={div3Ref}
                toRef={div4Ref}
                curvature={75}
                endYOffset={10}
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={div5Ref}
                toRef={div4Ref}
                curvature={-75}
                endYOffset={-10}
                reverse
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={div6Ref}
                toRef={div4Ref}
                reverse
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={div7Ref}
                toRef={div4Ref}
                curvature={75}
                endYOffset={10}
                reverse
              />
            </div>
          }
          className="col-span-1"
        />
        <BentoCard
          Icon={RiGlobalFill}
          name="Ranking"
          description="Participe de disputas amigáveis de conhecimentos com nossos rankings globais."
          background={
            <div className="absolute flex size-full items-center justify-center [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]">
              <Globe />
            </div>
          }
          className="lg:col-span-2 col-span-1"
        />
      </BentoGrid>
    </div>
  );
}
