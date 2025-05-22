import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export function ProductCardSkeleton() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="p-4 rounded-xl border shadow-sm bg-muted/50 space-y-3"
                >
                    <Skeleton className="h-32 w-full rounded-md" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/3" />
                </motion.div>
            ))}
        </motion.div>
    );
}
