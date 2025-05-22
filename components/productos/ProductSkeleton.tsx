
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export function ProductSkeleton() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
        >
            {[...Array(6)].map((_, i) => (
                <div key={i} className="grid grid-cols-6 gap-4 items-center">
                    <Skeleton className="h-4 w-full col-span-1" />
                    <Skeleton className="h-4 w-full col-span-2" />
                    <Skeleton className="h-4 w-full col-span-1" />
                    <Skeleton className="h-4 w-full col-span-1" />
                    <Skeleton className="h-4 w-full col-span-1" />
                </div>
            ))}
        </motion.div>
    );
}
