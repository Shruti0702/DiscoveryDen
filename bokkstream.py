import streamlit as st
from recommender import recommend  
st.title("Book Recommendation System")

# Input for the book name
book_name = st.text_input("Enter a book name:")
if book_name:
    recommendations = recommend(book_name)       
    if recommendations:
        st.write("Recommended Books:")
        for rec in recommendations:
            st.write(f"**Title:** {rec[0]}")  # Book Title
            st.write(f"**Author:** {rec[1]}")  # Book Author
            st.image(rec[2])  # Book Image
    else:
        st.write("No recommendations found. Please check the book name.")

