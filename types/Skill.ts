import { IconType } from "react-icons";

export type Skill = {
    name: string;
    icon: IconType;
    description: string;
    tags: string[];
    color?: string;
    badgeColor: string;
    style: string;
}

export type Degree = {
    id: string;
    degree: string;
    institution: string;
    period: string;
    description: string;
    tags: string[];
    style: string;
}

export type Cert = {
    id: number;
    title: string;
    issuer: string;
    year: string;
    img?: string;
    link?: string;
    description: string;
    tags: string[];
    icon: IconType;
    gradient: string;
    style: string;
}