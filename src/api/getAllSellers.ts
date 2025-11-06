import { http } from "@/lib/http";
import { Seller } from "@modals/ClaimItemsModal";

export async function getAllSellers(): Promise<Seller[]> {
    return await http(`/api/admin/sellers/`);
}
