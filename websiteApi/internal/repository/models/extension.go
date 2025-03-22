package models

type Extension struct {
	ID          string  `json:"id"`
	UserCount   int     `json:"userCount"`
	RatingValue float64 `json:"ratingValue"`
}
