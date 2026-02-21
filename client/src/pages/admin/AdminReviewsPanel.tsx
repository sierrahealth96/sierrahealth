import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle, X, Eye, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BASE_URL } from "@/Url";

const REVIEWS_API = `${BASE_URL}/api/reviews`;

export default function AdminReviewsPanel() {
  const [stats, setStats] = useState({
    pending: 0,
    accepted: 0,
    rejected: 0
  });
  const [pendingReviews, setPendingReviews] = useState([]);
  const [selectedProductReviews, setSelectedProductReviews] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch stats and pending reviews
  useEffect(() => {
    fetchStats();
    fetchPendingReviews();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${REVIEWS_API}/admin/stats`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Failed to fetch review stats:", err);
    }
  };

  const fetchPendingReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${REVIEWS_API}/admin/pending`);
      const data = await response.json();
      setPendingReviews(data);
    } catch (err) {
      console.error("Failed to fetch pending reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductReviews = async (productId) => {
    try {
      const response = await fetch(`${REVIEWS_API}/admin/product/${productId}`);
      const data = await response.json();
      setSelectedProductReviews(data);
    } catch (err) {
      console.error("Failed to fetch product reviews:", err);
    }
  };

  const updateReviewStatus = async (reviewId, status) => {
    try {
      const response = await fetch(`${REVIEWS_API}/admin/${reviewId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchStats(); // Refresh stats
        fetchPendingReviews(); // Refresh pending list
        if (selectedProduct) {
          fetchProductReviews(selectedProduct._id);
        }
      }
    } catch (err) {
      console.error("Failed to update review status:", err);
    }
  };

  const selectProductReviews = (product) => {
    setSelectedProduct(product);
    fetchProductReviews(product._id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Real Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="group bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-3xl border-2 border-orange-200/50 hover:border-orange-300/70 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center cursor-default"
        >
          <Clock className="w-14 h-14 text-orange-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
          <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2">
            {stats.pending}
          </div>
          <p className="text-lg font-bold text-muted-foreground/80">Pending Reviews</p>
          <p className="text-2xl font-black text-orange-600 mt-1">{pendingReviews.length} in queue</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="group bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-3xl border-2 border-emerald-200/50 hover:border-emerald-300/70 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center cursor-default"
        >
          <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
          <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            {stats.accepted}
          </div>
          <p className="text-lg font-bold text-muted-foreground/80">Accepted Reviews</p>
          <p className="text-sm text-emerald-600 font-semibold mt-1">Live on product pages</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="group bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-3xl border-2 border-red-200/50 hover:border-red-300/70 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center cursor-default"
        >
          <X className="w-14 h-14 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
          <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent mb-2">
            {stats.rejected}
          </div>
          <p className="text-lg font-bold text-muted-foreground/80">Rejected Reviews</p>
          <p className="text-sm text-red-600 font-semibold mt-1">Not approved</p>
        </motion.div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Reviews */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-orange-50/80 to-yellow-50/50 backdrop-blur-xl rounded-4xl p-8 border-2 border-orange-200/30 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black flex items-center gap-3">
              <Clock className="w-8 h-8 text-orange-500 drop-shadow-lg" />
              Pending Reviews ({stats.pending})
            </h2>
            <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200 font-bold px-4 py-2 text-lg">
              {pendingReviews.length} waiting
            </Badge>
          </div>
          
          {pendingReviews.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <Clock className="w-20 h-20 text-orange-300 mx-auto mb-6 opacity-50" />
              <h3 className="text-2xl font-black text-muted-foreground mb-2">No Pending Reviews</h3>
              <p className="text-lg text-muted-foreground">All reviews processed! 🎉</p>
            </motion.div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
              {pendingReviews.map((review) => (
                <motion.div
                  key={review._id}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group bg-white/80 backdrop-blur-sm p-6 rounded-3xl border-2 border-orange-200/50 hover:border-orange-400/70 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:bg-white"
                  onClick={() => selectProductReviews(review.product)}
                >
                  <div className="flex items-start justify-between mb-4 pb-4 border-b border-orange-100">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                        <span className="text-xl font-bold text-white">★</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-xl line-clamp-1 group-hover:text-orange-600 transition-colors">{review.name}</h4>
                        <p className="text-base text-orange-700 font-semibold line-clamp-1">{review.product?.name}</p>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 text-orange-700 border-orange-300 font-bold px-4 py-2 shadow-md">
                      PENDING
                    </Badge>
                  </div>
                  
                  <div className="flex gap-1 mb-4">
                    {Array(5).fill(0).map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-5 h-5 transition-all ${i < review.stars ? 'fill-yellow-400 text-yellow-400 drop-shadow-sm scale-110' : 'text-yellow-200'}`}
                      />
                    ))}
                  </div>
                  
                  <p className="text-base leading-relaxed mb-6 text-muted-foreground/90 line-clamp-3 group-hover:line-clamp-none transition-all">{review.comment}</p>
                  
                  <div className="flex gap-3 pt-4 border-t border-orange-100">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg font-bold h-12"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateReviewStatus(review._id, 'accepted');
                      }}
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg font-bold h-12 border-red-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateReviewStatus(review._id, 'rejected');
                      }}
                    >
                      <X className="w-5 h-5 mr-2" />
                      Reject
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Product Reviews Detail */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-slate-50/80 to-blue-50/50 backdrop-blur-xl rounded-4xl p-8 border-2 border-slate-200/30 shadow-2xl"
        >
          <h2 className="text-3xl font-black mb-8 flex items-center gap-3 text-slate-800">
            <Eye className="w-8 h-8 text-blue-500 drop-shadow-lg" />
            {selectedProduct ? `${selectedProduct.name} Reviews` : "Select Product to View"}
            {selectedProduct && (
              <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-800 px-3 py-1 text-sm font-bold">
                {selectedProductReviews.length} total
              </Badge>
            )}
          </h2>
          
          {selectedProductReviews.length > 0 ? (
            <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
              {selectedProductReviews.map((review) => (
                <motion.div
                  key={review._id}
                  whileHover={{ scale: 1.02 }}
                  className="group p-6 rounded-3xl border bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all border-slate-200 hover:border-blue-300"
                >
                  <div className="flex items-start justify-between mb-4 pb-3">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <span className="text-xl font-bold text-white">{review.name[0]?.toUpperCase()}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-lg line-clamp-1">{review.name}</h4>
                        <div className="flex gap-0.5 mb-1 mt-1">
                          {Array(5).fill(0).map((_, i) => (
                            <Star 
                              key={i}
                              className={`w-4 h-4 ${i < review.stars ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-slate-500 font-medium">
                          {new Date(review.createdAt).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      className={`font-bold px-4 py-2 shadow-md ${
                        review.status === 'accepted' 
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                          : 'bg-slate-100 text-slate-800 border-slate-200'
                      }`}
                    >
                      {review.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700 line-clamp-3 group-hover:line-clamp-none transition-all">
                    {review.comment}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 text-slate-500"
            >
              <Eye className="w-20 h-20 mx-auto mb-6 opacity-30" />
              <h3 className="text-2xl font-black mb-2 text-slate-400">Select a Product</h3>
              <p className="text-lg">Click any pending review to view all reviews for that product</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
