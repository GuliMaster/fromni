PGDMP                         {            Fromni    15.3    15.3                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16398    Fromni    DATABASE     |   CREATE DATABASE "Fromni" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE "Fromni";
                user    false                        0    0    DATABASE "Fromni"    COMMENT     8   COMMENT ON DATABASE "Fromni" IS 'DB for Fromni WebAPP';
                   user    false    3359            �            1259    16433    buttons    TABLE     �   CREATE TABLE public.buttons (
    id integer NOT NULL,
    id_channel integer NOT NULL,
    type character varying(32) NOT NULL,
    text text NOT NULL
);
    DROP TABLE public.buttons;
       public         heap    user    false            �            1259    16432    buttons_id_seq    SEQUENCE     �   ALTER TABLE public.buttons ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.buttons_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          user    false    220            �            1259    16410    channels    TABLE     }   CREATE TABLE public.channels (
    id integer NOT NULL,
    name character varying(32) NOT NULL,
    order_number integer
);
    DROP TABLE public.channels;
       public         heap    user    false            !           0    0    TABLE channels    COMMENT     >   COMMENT ON TABLE public.channels IS 'Channels for choosing.';
          public          user    false    215            �            1259    16409    channels_id_seq    SEQUENCE     �   ALTER TABLE public.channels ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.channels_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          user    false    215            �            1259    16420    keyboard_params    TABLE     �   CREATE TABLE public.keyboard_params (
    id_channel integer NOT NULL,
    type character varying(32) NOT NULL,
    max_amount integer,
    max_length_text integer,
    is_available_links boolean,
    amount_available_links integer
);
 #   DROP TABLE public.keyboard_params;
       public         heap    user    false            �            1259    16425    messages    TABLE     �   CREATE TABLE public.messages (
    id_channel integer NOT NULL,
    text text,
    keyboard_type character varying(32) DEFAULT 'standart'::character varying NOT NULL
);
    DROP TABLE public.messages;
       public         heap    user    false            �            1259    16415    text_params    TABLE     ]   CREATE TABLE public.text_params (
    id_channel integer NOT NULL,
    max_length integer
);
    DROP TABLE public.text_params;
       public         heap    user    false                      0    16433    buttons 
   TABLE DATA           =   COPY public.buttons (id, id_channel, type, text) FROM stdin;
    public          user    false    220   �                 0    16410    channels 
   TABLE DATA           :   COPY public.channels (id, name, order_number) FROM stdin;
    public          user    false    215   g                  0    16420    keyboard_params 
   TABLE DATA           �   COPY public.keyboard_params (id_channel, type, max_amount, max_length_text, is_available_links, amount_available_links) FROM stdin;
    public          user    false    217   �                  0    16425    messages 
   TABLE DATA           C   COPY public.messages (id_channel, text, keyboard_type) FROM stdin;
    public          user    false    218   ,!                 0    16415    text_params 
   TABLE DATA           =   COPY public.text_params (id_channel, max_length) FROM stdin;
    public          user    false    216   j!       "           0    0    buttons_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.buttons_id_seq', 52, true);
          public          user    false    219            #           0    0    channels_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.channels_id_seq', 8, true);
          public          user    false    214            x           2606    16414    channels Channels_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "Channels_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.channels DROP CONSTRAINT "Channels_pkey";
       public            user    false    215            �           2606    16459    buttons buttons_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.buttons
    ADD CONSTRAINT buttons_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.buttons DROP CONSTRAINT buttons_pkey;
       public            user    false    220            |           2606    16424 $   keyboard_params keyboard_params_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.keyboard_params
    ADD CONSTRAINT keyboard_params_pkey PRIMARY KEY (id_channel, type);
 N   ALTER TABLE ONLY public.keyboard_params DROP CONSTRAINT keyboard_params_pkey;
       public            user    false    217    217            ~           2606    16431    messages messages_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id_channel);
 @   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_pkey;
       public            user    false    218            z           2606    16419    text_params text_params_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.text_params
    ADD CONSTRAINT text_params_pkey PRIMARY KEY (id_channel);
 F   ALTER TABLE ONLY public.text_params DROP CONSTRAINT text_params_pkey;
       public            user    false    216            �           2606    16453    buttons buttons_id_channel_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.buttons
    ADD CONSTRAINT buttons_id_channel_fkey FOREIGN KEY (id_channel) REFERENCES public.channels(id) NOT VALID;
 I   ALTER TABLE ONLY public.buttons DROP CONSTRAINT buttons_id_channel_fkey;
       public          user    false    220    3192    215            �           2606    16438    text_params id_channel    FK CONSTRAINT     �   ALTER TABLE ONLY public.text_params
    ADD CONSTRAINT id_channel FOREIGN KEY (id_channel) REFERENCES public.channels(id) NOT VALID;
 @   ALTER TABLE ONLY public.text_params DROP CONSTRAINT id_channel;
       public          user    false    3192    216    215            �           2606    16443 /   keyboard_params keyboard_params_id_channel_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.keyboard_params
    ADD CONSTRAINT keyboard_params_id_channel_fkey FOREIGN KEY (id_channel) REFERENCES public.channels(id) NOT VALID;
 Y   ALTER TABLE ONLY public.keyboard_params DROP CONSTRAINT keyboard_params_id_channel_fkey;
       public          user    false    3192    217    215            �           2606    16448 !   messages messages_id_channel_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_id_channel_fkey FOREIGN KEY (id_channel) REFERENCES public.channels(id) NOT VALID;
 K   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_id_channel_fkey;
       public          user    false    218    3192    215               j   x�3��4�,,�L��0�bÅ6]�z�I��� !1��.6��]ةpa˅��^��25�4������LLO�K��M-K�+*�25�c�
�w]ء����� e�7�         G   x�3��H,)v,(�4����4�2�0�¬�.��taÅ]@r+�1�9gHjNjzQb.g�W� ���         ^   x�3�,.I�KI,*�41����,\��y9�y��`!0��U"���T�f&���ui Q3�JcN#�BC�\��H�����=... V +�         .   x�3�4������K�2�4�1�9M8�K�R�J�,8��=... �s}         "   x�3�41�4�2�4400�2��,8c��b���� O{�     