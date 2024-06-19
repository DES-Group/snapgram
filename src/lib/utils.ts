import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(dateString: string | undefined): string {
    
    if (dateString === undefined) return '';

    
    const now = new Date();    
    const date = new Date(dateString);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        return interval === 1 ? 'il y a 1 an' : `il y a ${interval} ans`;
    }

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return interval === 1 ? 'il y a 1 mois' : `il y a ${interval} mois`;
    }

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return interval === 1 ? 'il y a 1 jour' : `il y a ${interval} jours`;
    }

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval === 1 ? 'il y a 1 heure' : `il y a ${interval} heures`;
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return interval === 1 ? 'il y a 1 minute' : `il y a ${interval} minutes`;
    }

    return seconds <= 1 ? 'à l\'instant' : `il y a ${seconds} secondes`;
}

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};